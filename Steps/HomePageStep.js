const assert = require("assert");

class HomePageStep {
    constructor(homePage) {
        this.homePage = homePage;
    }

    async openHomePageAndVerifyIshomePageDisplayed() {
        await this.homePage.open();
        const isMainPageDisplayed = await this.homePage.isMainPageDisplayed();
        assert(isMainPageDisplayed, "Home page is not displayed");
    }

    async clickLanguageDropDownAndSelectLanguage() {
        await this.homePage.languageDropDown();
        await this.homePage.selectLanguage();
    }

    async searchForTermAndClickSubmitButton() {
        await this.homePage.searchBox();
        await this.homePage.submitButton();
    }

    
}

module.exports = HomePageStep;