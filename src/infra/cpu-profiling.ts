import { writeFile } from 'node:fs/promises'
import { Session } from 'node:inspector/promises'

export function initializeCPUProfiling() {
  let _session: Session
  return {
    async start() {
      _session = new Session()
      _session.connect()
      await _session.post('Profiler.enable')
      await _session.post('Profiler.start')

      console.log('CPU profiling started.')
    },

    async stop() {
      console.log('Stopping CPU profiling...')
      const { profile } = await _session.post('Profiler.stop')
      const profileName = `cpu-profile-${Date.now()}.cpuprofile`
      await writeFile(profileName, JSON.stringify(profile))
      _session.disconnect()
    },
  }
}
