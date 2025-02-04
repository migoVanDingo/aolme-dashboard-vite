export class Input {
  public static hasHarmfulCharacters(input: string): boolean {
    // Define the regex for potentially harmful characters
    const harmfulCharactersRegex = /[<>'"`;()%&]/g
    // Test if the input contains any of these characters
    return harmfulCharactersRegex.test(input)
  }

  public static isValidEmail(email: string) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  public static verifyPassword(password: string) {
    let password_errors = []
    let error = false

    if (password.length < 4) {
      password_errors.push("Password must be at least 10 characters")
      error = true
    }

    if (!/[A-Z]/.test(password)) {
      password_errors.push("Password must contain at least 1 uppercase letter")
      error = true
    }

    if (!/[a-z]/.test(password)) {
      password_errors.push("Password must contain at least 1 lowercase letter")
      error = true
    }

    if (!/[0-9]/.test(password)) {
      password_errors.push("Password must contain at least 1 number")
      error = true
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      password_errors.push(
        'Password must contain at least 1 special character: !@#$%^&*(),.?":{}|<></>'
      )
      error = true
    }

    return { error, password_errors }
  }
}
