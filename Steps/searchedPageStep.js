const assert = require('assert');

class SearchedPageStep {
    constructor(searchedPage) {
        this.searchedPage = searchedPage;
    }

    async searchedPageDisplayed() {
        const isSearchedPageDisplayed = await this.searchedPage.isSearchedPageDisplayed();
        assert(isSearchedPageDisplayed, "Searched page is not displayed");
    }

    async clickToolsDropDownAndDownloadAsPdf() {
        await this.searchedPage.toolsDropDown();
        await this.searchedPage.downloadAsPdf();
    }


}

module.exports = SearchedPageStep;