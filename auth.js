function originalLogin() { return 'original'; }
function buggyLogin() { 
  // TODO: Fix null pointer exception
  return user.password.validate(); 
}
