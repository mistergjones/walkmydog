const loadBMaps = (callback) => {

    // callback();
    const script1 = document.createElement('script');
    script1.type = "text/javascript";
    script1.innerHTML = `
        function AutoSuggest() {
            Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
                callback: function () {
                    var manager = new Microsoft.Maps.AutosuggestManager({
                        placeSuggestions: false
                    });
                    manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion );
                },
                errorCallback: function (msg) {
                    alert(msg);
                },
                credentials: 'AgLtgWPeUUEHUksG0sPgEitwL4CVbe9bH-SQRhadZ4k4HzGhEybjZ5IcZPGMzWG9'
            });
        }`


    script1.id = 'bingMaps';

    document.body.appendChild(script1);


    const script3 = document.createElement("script"); // Creates <script></script>
    script3.type = 'text/javascript'; // Set type
    script3.src = 'http://www.bing.com/api/maps/mapcontrol?callback=AutoSuggest'; // Set source
    document.body.appendChild(script3);


};
export default loadBMaps;



