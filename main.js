window.browserNPM = {
    async install(packageName) {
        function addScript(src) {
            const script = document.createElement("script");
            script.src = src;
            const nonceElement = document.querySelector("[nonce]");
            if (nonceElement) {
                script.nonce = nonceElement.nonce;
            }
            document.body.appendChild(script);
        }
        const apiUrl = `https://unpkg.com/${packageName}/package.json`;
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch package information for ${packageName}`);
            }

            const packageInfo = await response.json();

            if (packageInfo.main) {
                addScript(`https://unpkg.com/${packageName}@${packageInfo.version}/${packageInfo.main}`);
            } else {
                throw new Error(`Main JavaScript file not found for ${packageName}`);
            }
        } catch (error) {
            throw error;
        }
    }
}
