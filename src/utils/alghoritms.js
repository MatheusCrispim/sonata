export function alghoritmRandom(array, letter) {
    var listChallenges = [];
    var listChallengesLetterCorrect = []
    var listChallengesLetterWrong = []
    var listFinal = [];
    
    array.forEach(challeng => {
        String(challeng.image).trim();
        if (String(challeng.word).toUpperCase().startsWith(String(letter).toUpperCase())) {
            if (challeng.image !== '' || challeng.image !== undefined || challeng.image !== null) {
                listChallengesLetterCorrect.push(challeng);
            }
        } else {
            if (challeng.image !== '' || challeng.image !== undefined || challeng.image !== null) {
                listChallengesLetterWrong.push(challeng);
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