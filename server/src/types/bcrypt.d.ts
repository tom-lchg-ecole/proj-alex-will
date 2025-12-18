declare module 'bcrypt' {
  function hash(data: string, saltRounds: number): Promise<string>
  function compare(data: string, encrypted: string): Promise<boolean>
  function genSalt(rounds?: number): Promise<string>
  
  export default {
    hash,
    compare,
    genSalt,
  }
  
  export { hash, compare, genSalt }
}

