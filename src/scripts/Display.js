const Display = (() => {
    function capitalizeName(name) {
        return name.split(" ").map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(" ");
    }

    return { capitalizeName };
})();

export default Display;