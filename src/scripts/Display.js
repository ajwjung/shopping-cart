const Display = (() => {
    function capitalizeName(name) {
        return name.split(" ").map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(" ");
    }

    function formatDescription(description) {
        const lowercaseDescription = description.toLowerCase();

        return lowercaseDescription.charAt(0).toUpperCase() + lowercaseDescription.slice(1);
    }

    return { capitalizeName, formatDescription };
})();

export default Display;