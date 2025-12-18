class AuthController {
  async signIn(data: { username: string; email: string; password: string }) {
    console.log(data)
  }

  async signUp(data: { email: string; password: string }) {
    console.log(data)
  }
}

export const authController = new AuthController()
