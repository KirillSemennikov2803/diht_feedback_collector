class LocalizationService {
    // Authorization layout:
    authorizationHeader = () => "Авторизация";
    authorizationButton = () => "Войти";


    // Registration layout:
    registrationHeader = () => "Регистрация";
    tokenPlaceholder = () => "22345200-abe8-4f60-90c8-0d43c5f6c0f6";
    loginPlaceholder = () => "Costello1329";
    passwordPlaceholder = () => "password";
    confirmationPlaceholder = () => "password";
    registrationButton = () => "Зарегистрироваться";
    continueButton = () => "Продолжить";
}

export const localization = new LocalizationService();