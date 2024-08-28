export type OtpSchema = { otp: string, email: string }

export class OtpService {
  generate() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }


  validOtp(otpUser: string, otpDb: string) {
    if (otpUser !== otpDb) {
      throw new Error('Otp is not match')
    }
    return true
  }

  sendEmail() {
    return {
      email: "user1@gmail.com",
      otp: this.generate()
    }
  }

  sendPhone() {
    return {
      phone: "093242342",
      otp: this.generate()
    }
  }
}
