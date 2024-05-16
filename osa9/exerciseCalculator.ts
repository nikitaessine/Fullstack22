interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


function calculateExercises(dailyHours: number[], target: number): object {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;
    const average = dailyHours.reduce((a, b) => a + b) / periodLength;
    const success = average >= target;
    let rating = 2;
    let ratingDescription = 'not too bad but could be better';
    if (average < target / 2) {
        rating = 1;
        ratingDescription = 'you should try harder';
    } else if (average > target) {
        rating = 3;
        ratingDescription = 'good job';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
}

try {
    const args = process.argv.slice(2).map(arg => {
        const number = Number(arg);
        if (isNaN(number)) {
            throw new Error('Please provide numbers only');
        }
        return number;
    }); 

    if (args.length < 2) {
        throw new Error('Please provide at least two arguments - target and daily exercise hours');
    }

    const target = args[0];
    const dailyHours = args.slice(1);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
        errorMessage += error.message; 
    }
    console.log(errorMessage);
}