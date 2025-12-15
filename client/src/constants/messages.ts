export const LOGIN_MESSAGES = {
  WELCOME_BACK: 'Chào mừng bạn trở lại!',
  CREATE_ACCOUNT: 'Tạo tài khoản mới',
  LOGIN_SUCCESS: 'Đăng nhập thành công!',
  SIGNUP_SUCCESS: 'Đăng ký thành công!',
  NO_ACCOUNT: 'Chưa có tài khoản? ',
  HAS_ACCOUNT: 'Đã có tài khoản? ',
  SIGNUP_NOW: 'Đăng ký ngay',
  LOGIN: 'Đăng nhập',
  FORGOT_PASSWORD: 'Quên mật khẩu?',
  REMEMBER_ME: 'Ghi nhớ đăng nhập',
  OR: 'Hoặc',
  CONTINUE_WITH_GOOGLE: 'Tiếp tục với Google',
  CONTINUE_WITH_FACEBOOK: 'Tiếp tục với Facebook',
  TERMS_TEXT: 'Bằng cách đăng ký, bạn đồng ý với',
  TERMS_OF_SERVICE: 'Điều khoản dịch vụ',
  PRIVACY_POLICY: 'Chính sách bảo mật',
  AND: 'và',
} as const;

export const FORM_LABELS = {
  FULL_NAME: 'Họ và tên',
  EMAIL: 'Email',
  PASSWORD: 'Mật khẩu',
  CONFIRM_PASSWORD: 'Xác nhận mật khẩu',
} as const;

export const FORM_PLACEHOLDERS = {
  FULL_NAME: 'Nguyễn Văn A',
  EMAIL: 'example@email.com',
  PASSWORD: '••••••••',
} as const;

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Vui lòng nhập tên của bạn',
  EMAIL_REQUIRED: 'Vui lòng nhập email',
  EMAIL_INVALID: 'Email không hợp lệ',
  PASSWORD_REQUIRED: 'Vui lòng nhập mật khẩu',
  PASSWORD_MIN_LENGTH: 'Mật khẩu phải có ít nhất 6 ký tự',
  CONFIRM_PASSWORD_MISMATCH: 'Mật khẩu không khớp',
} as const;

export const SOCIAL_LOGIN_MESSAGES = {
  LOGIN_WITH: (provider: string) => `Đăng nhập với ${provider}`,
} as const;

