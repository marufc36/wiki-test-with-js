const fs = require("fs");
const path = require("path");

class FileUtils {
    constructor(downloadFolderPath) {
        this.downloadFolderPath = downloadFolderPath;
    }

    /**
     * Check if a file exists in the download folder.
     * @param {string} fileName - The name of the file to check.
     * @returns {Promise<boolean>} - Resolves to true if the file exists, otherwise false.
     */
    async isFileDownloaded(fileName) {
        const filePath = path.join(this.downloadFolderPath, fileName);
        return fs.promises.access(filePath, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);
    }

    /**
     * Wait for a file to appear in the download folder within a timeout.
     * @param {string} fileName - The name of the file to wait for.
     * @param {number} timeout - The maximum time to wait in milliseconds.
     * @returns {Promise<boolean>} - Resolves to true if the file is downloaded, otherwise false.
     */
    async waitForFileDownload(fileName, timeout = 30000) {
        const interval = 1000; // Check every second
        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            if (await this.isFileDownloaded(fileName)) {
                return true;
            }
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
        return false;
    }
}

module.exports = FileUtils;
