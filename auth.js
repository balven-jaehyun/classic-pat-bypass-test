function originalLogin() { return 'original'; }

function buggyLogin(user) { 
  // 안전한 패스워드 검증 로직
  try {
    // 1. 사용자 객체 유효성 검사
    if (!user || typeof user !== 'object') {
      console.warn('Invalid user object provided');
      return { success: false, error: 'Invalid user data' };
    }
    
    // 2. 패스워드 존재 여부 및 타입 검사
    if (!user.password || typeof user.password !== 'string') {
      console.warn('Password is missing or invalid');
      return { success: false, error: 'Password required' };
    }
    
    // 3. 패스워드 길이 검증
    if (user.password.length < 8) {
      return { success: false, error: 'Password too short' };
    }
    
    // 4. 안전한 패스워드 검증 실행
    if (user.password.validate && typeof user.password.validate === 'function') {
      const validationResult = user.password.validate();
      return { success: true, validated: validationResult };
    } else {
      // validate 메서드가 없는 경우 기본 검증
      const hasUpperCase = /[A-Z]/.test(user.password);
      const hasLowerCase = /[a-z]/.test(user.password);
      const hasNumbers = /\d/.test(user.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(user.password);
      
      const isValid = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
      return { success: isValid, error: isValid ? null : 'Password does not meet security requirements' };
    }
    
  } catch (error) {
    console.error('Login validation error:', error.message);
    return { success: false, error: 'Validation failed due to system error' };
  }
}
