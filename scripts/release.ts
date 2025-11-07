#!/usr/bin/env bun

/**
 * Usage:
 *   bun run release [patch|minor|major|version] [--no-publish] [--skip-workflow] [--dry-run]
 */

import gradient from 'gradient-string'
import { createSpinner } from 'nanospinner'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

type BumpType = 'patch' | 'minor' | 'major'

const PROJECT_ROOT = join(import.meta.dir, '..')
const PACKAGE_JSON_PATH = join(PROJECT_ROOT, 'package.json')

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',

  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  gray: '\x1b[90m',

  brightCyan: '\x1b[96m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightRed: '\x1b[91m',

  bgCyan: '\x1b[46m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgMagenta: '\x1b[45m',
  bgRed: '\x1b[41m',
}

const c = colors

interface RollbackState {
  originalVersion: string
  versionChanged: boolean
  commitCreated: boolean
  tagCreated: boolean
  published: boolean
  pushed: boolean
}

const rollbackState: RollbackState = {
  originalVersion: '',
  versionChanged: false,
  commitCreated: false,
  tagCreated: false,
  published: false,
  pushed: false,
}

function readPackageJson() {
  const content = readFileSync(PACKAGE_JSON_PATH, 'utf-8')
  return JSON.parse(content)
}

function writePackageJson(pkg: any) {
  writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + '\n')
}

function parseVersion(version: string): [number, number, number] {
  const parts = version.split('.').map(Number)
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Invalid version format: ${version}`)
  }
  return parts as [number, number, number]
}

function bumpVersion(current: string, type: BumpType): string {
  const [major, minor, patch] = parseVersion(current)

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
  }
}

function isValidVersion(version: string): boolean {
  return /^\d+\.\d+\.\d+$/.test(version)
}

async function runCommand(
  cmd: string,
  args: string[] = [],
  options: { silent?: boolean } = {}
) {
  const proc = Bun.spawn([cmd, ...args], {
    cwd: PROJECT_ROOT,
    stdout: options.silent ? 'pipe' : 'inherit',
    stderr: options.silent ? 'pipe' : 'inherit',
  })

  const exitCode = await proc.exited
  if (exitCode !== 0) {
    throw new Error(`Command failed with exit code ${exitCode}`)
  }
}

async function runCommandWithOutput(
  cmd: string,
  args: string[] = []
): Promise<string> {
  const proc = Bun.spawn([cmd, ...args], {
    cwd: PROJECT_ROOT,
    stdout: 'pipe',
    stderr: 'pipe',
  })

  const output = await new Response(proc.stdout).text()
  const exitCode = await proc.exited

  if (exitCode !== 0) {
    const error = await new Response(proc.stderr).text()
    throw new Error(`Command failed: ${error}`)
  }

  return output.trim()
}

async function checkGitStatus() {
  const proc = Bun.spawn(['git', 'status', '--porcelain'], {
    cwd: PROJECT_ROOT,
    stdout: 'pipe',
  })

  const output = await new Response(proc.stdout).text()

  if (output.trim()) {
    console.error(
      `\n${c.brightRed}❌ Working directory is not clean!${c.reset}`
    )
    console.error(
      `${c.yellow}   Please commit or stash changes first.${c.reset}\n`
    )
    console.error(`${c.gray}Uncommitted changes:${c.reset}`)
    console.error(output)
    process.exit(1)
  }
}

async function getCurrentBranch(): Promise<string> {
  const proc = Bun.spawn(['git', 'branch', '--show-current'], {
    cwd: PROJECT_ROOT,
    stdout: 'pipe',
  })

  return (await new Response(proc.stdout).text()).trim()
}

async function getLastCommitHash(): Promise<string> {
  const proc = Bun.spawn(['git', 'rev-parse', 'HEAD'], {
    cwd: PROJECT_ROOT,
    stdout: 'pipe',
  })

  return (await new Response(proc.stdout).text()).trim()
}

async function getRemoteUrl(): Promise<string> {
  return await runCommandWithOutput('git', [
    'config',
    '--get',
    'remote.origin.url',
  ])
}

async function parseRepoInfo(): Promise<{
  owner: string
  repo: string
} | null> {
  try {
    const remoteUrl = await getRemoteUrl()

    const httpsMatch = remoteUrl.match(
      /github\.com[:/]([^/]+)\/([^/.]+)(\.git)?/
    )

    if (httpsMatch) {
      return {
        owner: httpsMatch[1],
        repo: httpsMatch[2],
      }
    }

    return null
  } catch {
    return null
  }
}

function header(title: string) {
  const g = gradient(['#3b82f6', '#06b6d4'])
  console.log(g('╭─────────────────────────╮'))
  console.log(g(`│     ${title}      │`))
  console.log(g('╰─────────────────────────╯\n'))
}

function startSpinner(text: string) {
  const s = createSpinner(text).start()
  return s
}

async function withSpinner<T>(
  text: string,
  fn: () => Promise<T>,
  onErrorText?: string
): Promise<T> {
  const spinner = startSpinner(text)
  const start = Date.now()
  try {
    const res = await fn()
    const duration = Date.now() - start
    spinner.success({
      text: `${text} (${(duration / 1000).toFixed(2)}s)`,
    })
    return res
  } catch (err) {
    const duration = Date.now() - start
    spinner.error({
      text: `${onErrorText ?? text + ' failed'} (${(duration / 1000).toFixed(
        2
      )}s)`,
    })
    throw err
  }
}

async function autoCommitIfDirty() {
  const proc = Bun.spawn(['git', 'status', '--porcelain'], {
    cwd: PROJECT_ROOT,
    stdout: 'pipe',
  })

  const output = await new Response(proc.stdout).text()

  if (!output.trim()) {
    return
  }

  await runCommand('bun', ['run', 'commit'], { silent: true })
}

async function waitForWorkflowCompletion(
  owner: string,
  repo: string,
  tagName: string
): Promise<boolean> {
  const spinner = startSpinner('Monitoring GitHub workflow')
  const startTime = Date.now()

  try {
    const ghCheck = Bun.spawn(['gh', '--version'], {
      stdout: 'pipe',
      stderr: 'pipe',
    })
    await ghCheck.exited

    await Bun.sleep(1000)

    const output = await runCommandWithOutput('gh', [
      'run',
      'list',
      '--workflow=release.yml',
      '--limit=1',
      '--json',
      'databaseId,status,conclusion',
    ])

    const runs = JSON.parse(output)

    if (runs.length === 0) {
      spinner.warn({ text: 'Workflow not found (may still be queuing)' })
      return true
    }

    const run = runs[0]
    const runId = run.databaseId

    spinner.update({ text: `Watching workflow run #${runId}` })

    spinner.stop()

    const watchProc = Bun.spawn(
      ['gh', 'run', 'watch', runId.toString(), '--exit-status', '-i', '0'],
      {
        cwd: PROJECT_ROOT,
        stdout: 'inherit',
        stderr: 'inherit',
      }
    )

    const exitCode = await watchProc.exited
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)

    if (exitCode === 0) {
      console.log(`${c.green}✓ Workflow completed (${duration}s)${c.reset}`)
      return true
    } else {
      console.log(`${c.red}✗ Workflow failed (${duration}s)${c.reset}`)
      console.log(
        `${c.yellow}View logs: https://github.com/${owner}/${repo}/actions/runs/${runId}${c.reset}`
      )
      return false
    }
  } catch (error) {
    spinner.error({ text: 'Workflow monitoring failed' })
    console.log(
      `${c.yellow}Check manually: https://github.com/${owner}/${repo}/actions${c.reset}`
    )
    return true
  }
}

async function rollback(newVersion: string) {
  console.log(
    `\n${c.bright}${c.bgRed}${c.white} ⚠️  ROLLING BACK CHANGES ${c.reset}\n`
  )

  try {
    if (rollbackState.versionChanged) {
      await withSpinner(
        `Restoring package.json to ${rollbackState.originalVersion}`,
        async () => {
          const pkg = readPackageJson()
          pkg.version = rollbackState.originalVersion
          writePackageJson(pkg)
        }
      )
    }

    await withSpinner('Resetting git working directory', async () => {
      await runCommand('git', ['reset', '--hard', 'HEAD'], { silent: true })
    })

    if (rollbackState.commitCreated) {
      await withSpinner('Removing release commit', async () => {
        await runCommand('git', ['reset', '--hard', 'HEAD~1'], { silent: true })
      })
    }

    if (rollbackState.tagCreated) {
      await withSpinner(`Deleting local tag v${newVersion}`, async () => {
        await runCommand('git', ['tag', '-d', `v${newVersion}`], {
          silent: true,
        }).catch(() => {})
      })
    }

    if (rollbackState.pushed) {
      console.log(
        `${c.brightYellow}⚠️  Changes were pushed to remote${c.reset}`
      )

      try {
        await withSpinner('Deleting remote tag', async () => {
          await runCommand(
            'git',
            ['push', 'origin', `:refs/tags/v${newVersion}`],
            { silent: true }
          )
        })

        await withSpinner('Force pushing to revert', async () => {
          await runCommand('git', ['push', 'origin', 'main', '--force'], {
            silent: true,
          })
        })
      } catch (error) {
        console.log(`${c.red}✗ Could not clean remote automatically${c.reset}`)
        console.log(`${c.yellow}Manual cleanup required:${c.reset}`)
        console.log(`  git push origin :refs/tags/v${newVersion}`)
        console.log(`  git push origin main --force`)
      }
    }

    if (rollbackState.published) {
      const pkg = readPackageJson()
      console.log(`${c.brightRed}⚠️  Package was published!${c.reset}`)
      console.log(`${c.yellow}Options:${c.reset}`)
      console.log(`  bun pm deprecate ${pkg.name}@${newVersion} "Broken release"`)
      console.log(`  bun run release patch`)
    }

    console.log(`${c.brightGreen}✓ Rollback completed${c.reset}`)
  } catch (error) {
    console.error(`${c.brightRed}❌ Rollback failed:${c.reset}`, error)
    console.error(
      `${c.yellow}Original version: ${rollbackState.originalVersion}${c.reset}`
    )
  }
}

async function release() {
  console.clear()
  const args = process.argv.slice(2)

  const skipPublish = args.includes('--no-publish')
  const dryRun = args.includes('--dry-run')
  const skipWorkflow =
    args.includes('--skip-workflow') || args.includes('--no-workflow')
  const versionArg = args.find((arg) => !arg.startsWith('--'))

  header('winput release')

  const pkg = readPackageJson()
  const currentVersion = pkg.version
  rollbackState.originalVersion = currentVersion

  let newVersion: string
  let sameVersionRelease = false

  if (!versionArg) {
    console.log(`${c.brightBlue}📦 Releasing current version${c.reset}`)
    newVersion = currentVersion
    sameVersionRelease = true
  } else if (['patch', 'minor', 'major'].includes(versionArg)) {
    newVersion = bumpVersion(currentVersion, versionArg as BumpType)
  } else if (isValidVersion(versionArg)) {
    newVersion = versionArg
    if (newVersion === currentVersion) {
      sameVersionRelease = true
    }
  } else {
    console.error(`${c.brightRed}❌ Invalid version: ${versionArg}${c.reset}`)
    console.error(
      `${c.yellow}Expected: patch | minor | major | x.y.z${c.reset}\n`
    )
    process.exit(1)
  }

  console.log(`${c.cyan}Current: ${c.bright}${currentVersion}${c.reset}`)
  console.log(`${c.brightGreen}Release: ${c.bright}${newVersion}${c.reset}`)

  if (!sameVersionRelease) {
    console.log(`${c.dim}${currentVersion} → ${newVersion}${c.reset}`)
  }

  if (dryRun) {
    console.log(`${c.brightCyan}✨ Dry run complete${c.reset}\n`)
    process.exit(0)
  }

  process.stdout.write(`${c.brightYellow}Continue? ${c.dim}[y/n]${c.reset} `)

  for await (const line of console) {
    const answer = line.toString().trim().toLowerCase()
    if (answer !== 'y' && answer !== 'yes' && answer !== '') {
      console.log(`${c.red}Release cancelled${c.reset}\n`)
      process.exit(0)
    }
    break
  }

  console.log()

  try {
    // Build
    await withSpinner('Building project', async () => {
      await runCommand('bun', ['run', 'build'], { silent: true })
    })

    if (!sameVersionRelease) {
      // Package.json
      pkg.version = newVersion
      writePackageJson(pkg)
      rollbackState.versionChanged = true
    }

    // Auto commit
    await withSpinner('Committing changes', async () => {
      await autoCommitIfDirty()
      await checkGitStatus()
    })

    // Tag
    await withSpinner(`Creating tag v${newVersion}`, async () => {
      await runCommand(
        'git',
        ['tag', '-f', `v${newVersion}`, '-m', `Release v${newVersion}`],
        { silent: true }
      )
      rollbackState.tagCreated = true
    })

    // Push
    await withSpinner('Pushing to remote', async () => {
      await runCommand('git', ['push'], { silent: true })
      await runCommand('git', ['push', '--tags', '--force'], { silent: true })
      rollbackState.pushed = true
    })

    // Workflow monitoring
    if (!skipWorkflow) {
      const repoInfo = await parseRepoInfo()
      if (repoInfo) {
        const workflowSuccess = await waitForWorkflowCompletion(
          repoInfo.owner,
          repoInfo.repo,
          `v${newVersion}`
        )

        if (!workflowSuccess) {
          throw new Error('GitHub Release workflow failed')
        }
      }
    }

    // Publish
    if (!skipPublish) {
      await withSpinner('Publishing package (bun publish)', async () => {
        await runCommand('bun', ['publish'])
        rollbackState.published = true
      })
    } else {
      console.log(`\n${c.yellow}⏭️  Skipping publish step${c.reset}`)
    }

    console.log(
      `${c.bright}${c.bgGreen}${c.white} ✨ Release v${newVersion} completed! ${c.reset}\n`
    )
  } catch (error) {
    console.error(`${c.brightRed}❌ Release failed:${c.reset}`, error)
    await rollback(newVersion)
    process.exit(1)
  }
}

release()
