import fs from 'fs'
import path from 'path'

interface Env {
  key: string
  value: string
}

interface Option {
  envPath?: string
}

export default class SimpleEnv {
  #encoding = 'utf8'
  #envPath = path.resolve(process.cwd(), '.env')
  #envDefaultValue = ''
  #windowsLineBeak = /\r\n/g
  #quotationMark = /^(['"`])([\s\S]*)\1$/mg
  #envStructure = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg
  #envNotFound = 'Error: .env file not found in root directory!'

  constructor (option?: Option) {
    this.utilize(option)
    this.setup()
  }

  private utilize (option?: Option): void {
    if (option?.envPath !== undefined) {
      this.#envPath = option.envPath
    }
  }

  private setup (): void {
    const source = this.read(this.#envPath)
    const envs = this.parse(source)
    this.populate(envs)
  }

  private read (path: string): string {
    try {
      const buffer = fs.readFileSync(path, this.#encoding as any)
      const text = buffer.toString()
      const content = text.replace(this.#windowsLineBeak, '\n')

      return content
    } catch (error) {
      console.error(this.#envNotFound)
      process.exit(1)
    }
  }

  private match (text: string, regex: RegExp): RegExpExecArray[] {
    const matchedList: RegExpExecArray[] = []

    while (true) {
      const result = regex.exec(text)

      if (result === null) {
        break
      } else {
        matchedList.push(result)
      }
    }

    return matchedList
  }

  private extractKey (match: RegExpExecArray): string {
    const key = match[1]

    return key
  }

  private extractValue (match: RegExpExecArray): string {
    const sourceString = (match[2] === undefined) ? this.#envDefaultValue : match[2]
    const value = sourceString.trim().replace(this.#quotationMark, '$2')

    return value
  }

  private extractEnv (match: RegExpExecArray): Env {
    const key = this.extractKey(match)
    const value = this.extractValue(match)
    const env = { key, value }

    return env
  }

  private parse (text: string): Env[] {
    const entries = this.match(text, this.#envStructure)
    const envs = entries.map(this.extractEnv.bind(this))

    return envs
  }

  private populate (envs: Env[]): void {
    envs.forEach(eachEnv => {
      process.env[eachEnv.key] = eachEnv.value
    })
  }
}
