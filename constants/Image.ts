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
    logoHighFront:require("../assets/Logo-High_front.png")
  
} as const;

export type ImagesPathKey = keyof typeof ImagesPath;