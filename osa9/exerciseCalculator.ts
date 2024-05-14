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
console.log(calculateExercises([3, 7, 2, 4.5, 0, 3, 1], 2));