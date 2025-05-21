const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor() {
        this.currentText = "";
    }

    updateTranslation(targetWord, foundMatch, replacementWord) {
        let newWord = "";
        let uppercase = foundMatch[0].trim()[0] === foundMatch[0].trim()[0].toUpperCase();
        if (uppercase) {
            newWord += foundMatch[0].replace(foundMatch[0].trim().slice(0, targetWord.length), `<span class=\"highlight\">${replacementWord[0].toUpperCase()}${replacementWord.slice(1)}</span>`);
        } else {
            newWord += foundMatch[0].replace(foundMatch[0].trim().slice(0, targetWord.length), `<span class=\"highlight\">${replacementWord}</span>`);
        }
        const transStart = this.currentText.slice(0, foundMatch.index);
        const transEnding = this.currentText.slice(foundMatch.index + foundMatch[0].length);
        if (foundMatch.index == 0) {
            this.currentText = newWord + transEnding;
        } else {
            this.currentText = transStart + newWord + transEnding; 
        }
    }
    
    searchMatches(word) {
        let search1 = new RegExp(`^${word}[^a-z0-9-]`, 'i');
        let search2 = new RegExp(`\\s${word}[^a-z0-9-]`, 'i');
        let search3 = new RegExp(`\\s${word}$`, 'i');
        let search4 = new RegExp(`^${word}$`, 'i');
        if (this.currentText.match(search1)) {
            return this.currentText.match(search1);
        } else if (this.currentText.match(search2)) {
            return this.currentText.match(search2);
        } else if (this.currentText.match(search3)) {
            return this.currentText.match(search3);
        } else if (this.currentText.match(search4)) {
            return this.currentText.match(search4)
        } else {
            return false;
        }
    }

    findBritishTranslation(property) {
        let found = this.searchMatches(property);
        if  (found) {
            //console.log(found);
            this.updateTranslation(property, found, americanOnly[property]);
            this.findBritishTranslation(property);
        }
    }

    findBritishSpelling(property) {
        let found = this.searchMatches(property);
        if  (found) {
            //console.log(found);
            this.updateTranslation(property, found, americanToBritishSpelling[property]);
            this.findBritishSpelling(property);
        }
    }

    findBritishTitle(property) {
        let found = this.searchMatches(`${property.slice(0, property.length - 1)}[.]`)
        if  (found) {
            //console.log(found);
            this.updateTranslation(property, found, americanToBritishTitles[property]);
            this.findBritishTitle(property);
        }
    }

    findBritishTime() {
        let found = this.currentText.match(/\d{1,2}[:]\d\d/);
        if (found) {
            //console.log(found);
            let hoursMin = found[0].split(":");
            this.currentText = this.currentText.replace(found, `<span class=\"highlight\">${hoursMin[0]}.${hoursMin[1]}</span>`);
            this.findBritishTime();
        }
    }
    
    americanToBritish(text) {
        for (let americanWord in americanOnly) {
            this.findBritishTranslation(americanWord)
        }
        for (let americanWord in americanToBritishSpelling) {
            this.findBritishSpelling(americanWord)
        }
        for (let americanWord in americanToBritishTitles) {
            this.findBritishTitle(americanWord)
        }
        this.findBritishTime();
        if (this.currentText === text) {
            return "Everything looks good to me!"
        } else {
            return this.currentText;
        }
    }

    

    findAmericanTranslation(property) {
        let found = this.searchMatches(property);
        if (found) {
            //console.log(found);
            this.updateTranslation(property, found, britishOnly[property]);
            this.findAmericanTranslation(property);
        }
    }
    
    findAmericanSpelling(property) {
        let found = this.searchMatches(americanToBritishSpelling[property]);
        if (found) {
            //console.log(found);
            this.updateTranslation(americanToBritishSpelling[property], found, property);
            this.findAmericanSpelling(property);
        }
    }

    findAmericanTitle(property) {
        let found = this.searchMatches(americanToBritishTitles[property]);
        if (found) {
            //console.log(found);
            this.updateTranslation(americanToBritishTitles[property], found, property);
            this.findAmericanTitle(property);
        }
    }

    findAmericanTime() {
        let found = this.currentText.match(/\d{1,2}[.]\d\d/);
        if (found) {
            //console.log(found);
            let hoursMin = found[0].split(".");
            this.currentText = this.currentText.replace(found, `<span class=\"highlight\">${hoursMin[0]}:${hoursMin[1]}</span>`);
            this.findAmericanTime();
        }
    }

    britishToAmerican(text) {
        for (let britishWord in britishOnly) {
            this.findAmericanTranslation(britishWord);
        }
        for (let britishWord in americanToBritishSpelling) {
            this.findAmericanSpelling(britishWord);
        }
        for (let britishWord in americanToBritishTitles) {
            this.findAmericanTitle(britishWord);
        }
        this.findAmericanTime();
        if (this.currentText === text) {
            return "Everything looks good to me!"
        } else {
            return this.currentText;
        }
    }

    translate(text, locale) {
        this.currentText = text;
        //console.log(text);
        let translation;
        if (locale === "american-to-british") {
            translation = this.americanToBritish(text);
        } else if (locale === "british-to-american") {
            translation = this.britishToAmerican(text);
        } else {
            return {error: "Invalid value for locale field"}
        
        }
        //console.log(translation);
        return {text: text, translation: translation};
    }
}

module.exports = Translator;