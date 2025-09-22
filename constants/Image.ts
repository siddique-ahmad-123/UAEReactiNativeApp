export const ImagesPath = {

    landingPageImage1:require("../assets/images/StaringCarosoul/CreditCard.png"),
    landingPageImage2:require("../assets/images/StaringCarosoul/Mortgages.png"),
    landingPageImage3:require("../assets/images/StaringCarosoul/AutoLoans.png"),
    landingPageImage4:require("../assets/images/StaringCarosoul/PersonalLoans.png"),
    newgenLogo:require("../assets/images/newgenLogo1.png"),
    backgroundImage:require("../assets/images/background.png"),
    card1Image:require("../assets/images/card1.png"),
    card2Image:require("../assets/images/card2.png"),
    card3Image:require("../assets/images/card3.png"),
    approvedIconImage:require("../assets/images/approved-icon.png"),
    animatedImage:require("../assets/images/animatedImg.png"),
    logoHighFront:require("../assets/Logo-High_front.png"),
    mainScreencardImages:require("../assets/images/MainScreenCard/Card.png"),
    mainScreenMortgageImages:require("../assets/images/MainScreenCard/Mortgage.png"),
    mainScreenAutoLoan:require("../assets/images/MainScreenCard/AutoLoan.png"),
    mainScreenPersonalLoan:require("../assets/images/MainScreenCard/PersonalLoan.png"),
    heroBannerImages:require("../assets/images/HeroBanner.png")
  
} as const;

export type ImagesPathKey = keyof typeof ImagesPath;