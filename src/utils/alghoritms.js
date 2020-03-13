import { AsyncStorage } from 'react-native';

export function alghoritmRandom(array, letter) {
    var listChallenges = [];
    var listChallengesLetterCorrect = []
    var listChallengesLetterWrong = []
    var listFinal = [];
    var has_word = false;

    arrayShuffled = shuffle(array);
    
    arrayShuffled.forEach(challeng => {
        has_word = false;
        String(challeng.image).trim();
        if (String(challeng.word).toUpperCase().startsWith(String(letter).toUpperCase())) {
            if (challeng.image !== '' || challeng.image !== undefined || challeng.image !== null) {
                listChallengesLetterWrong.forEach(e => {
                    if (String(e.word).toUpperCase() === String(challeng.word).toUpperCase()) {
                        has_word = true;
                        return;
                    }
                });
                if (!has_word) {
                    listChallengesLetterWrong.push(challeng);
                }
            }
        } else {
            if (challeng.image !== '' || challeng.image !== undefined || challeng.image !== null) {
                listChallengesLetterWrong.forEach(e => {
                    if (String(e.word).toUpperCase() === String(challeng.word).toUpperCase()) {
                        has_word = true;
                        return;
                    }
                });
                if (!has_word) {
                    listChallengesLetterWrong.push(challeng);
                }
            }
        }
    });

    listFinal = joinLists(listChallengesLetterCorrect, listChallengesLetterWrong);

    listChallenges = shuffle(listFinal);
    return listChallenges
}

export function shuffle(array) {
    var ctr = array.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}

export function joinLists(array1, array2) {
    var listJoined = [];

    if (array1.length >= 6) {
        array1 = array1.slice(0, 6);
        array2 = array2.slice(0, 4);
    } else {
        lengthArray = 10 - array1.length;
        array2 = array2.slice(0, lengthArray);
    }

    array1.forEach(element => {
        listJoined.push(element)
    });

    array2.forEach(element => {
        listJoined.push(element)
    });

    return listJoined;
}

export async function verifyLevelCompleted(letters, context) {

    const response = await AsyncStorage.getItem('levels');
    const levels = JSON.parse(response);
    const objContext = letters[context];
    
    if (objContext['A'] === true && objContext['E'] === true && objContext['I'] === true && objContext['O'] === true && objContext['U'] === true) {
        levels[context]['secondLevel'] = true;
        AsyncStorage.setItem('levels', JSON.stringify(levels))
    } 
    
    if (objContext['B'] === true && objContext['P'] === true && objContext['T'] === true && objContext['D'] === true) {
        console.log("passou")
        levels[context]['thirdLevel'] = true;
        AsyncStorage.setItem('levels', JSON.stringify(levels))
    } 
    
    if (objContext['S'] === true && objContext['V'] === true && objContext['F'] === true && objContext['Z'] === true && objContext['X'] === true) {
        levels[context]['fourthLevel'] = true;
        AsyncStorage.setItem('levels', JSON.stringify(levels))
    } 
    
    if (objContext['M'] === true && objContext['N'] === true && objContext['R'] === true && objContext['L']) {
        levels[context]['fifthLevel'] = true;
        AsyncStorage.setItem('levels', JSON.stringify(levels))
    }

    if (objContext['C'] === true && objContext['Q'] === true && objContext['G'] === true && objContext['J'])

    console.log("verificando")
}
