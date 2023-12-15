const message1 = {
    eventName: "game-end",
    gameData: {
        timeSpend: gameModel.timerData.elapsed, //time in seconds
        score: gameModel.score.getScore(), // score in stars
        timeBonus: gameModel.timerData.timeBonus, // amount of time bonus (+30s) added 1, 2, 3 etc..
        activePowerUp: gameModel.activePowerUp, //active powerup multiplier or timebonus
    }
};



const message2 = {
    eventName: "game-end",
    gameData: {
        timeSpend: timeInSeconds, //time in seconds
        score: gameModel.score.getScore(), // score in stars
        superItems: superItems, // суперайтемы - сколько штук он ловил и каких
        items: gameModel.activePowerUp, //сколько обычных айтемов он словил

    }
};


const message3 = {
    eventName: "game-end",
    gameData: {
        timeSpent: timeInSeconds,
        score: userScore,
        items: {
            plus10: n1, 
            plus20: n2,
            minusNpoints: n3,
            minusNseconds: n4,
            plusNseconds: n5,
            magnet: n6,
            speedUp
        }
    }
};

const message4 = {
    eventName: "game-end",
    gameData: {
        timeSpent: timeInSeconds,
        score: userScore,
        itemsHist: "12112311012135"
    }
};

const message = {
    eventName: "game-end",
    gameData: {
        timeSpent: timeInSeconds,
        score: userScore,
        gameImage: Blowfish.encrypt(itemsHist, key) "%dssFhsGbdbBsoOa22" encoded with Blowfish algorithm string of item hist "121123110121352211122211122211111112",
        items: {
            plus10: n1, 
            plus20: n2,
            minusNpoints: n3,
            minusNseconds: n4,
            plusNseconds: n5,
            magnet: n6,
            speedUp
        }
    }
};
