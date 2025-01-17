const assert = require("assert");

class DownloadAsPdfPageStep {
    constructor(downloadAsPdfPage) {
        this.downloadAsPdfPage = downloadAsPdfPage;
    }

    async clickDownloadBtn() {
        await this.downloadAsPdfPage.downloadBtn();
    }   
}

module.exports = DownloadAsPdfPageStep;