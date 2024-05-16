interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: number[]): BmiValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

function calculateBmi(height: number, weight: number): string {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

try {
    const args = process.argv.slice(2).map(arg => {
        const number = Number(arg);
        if (isNaN(number)) {
            throw new Error('Please provide numbers only');
        }
        return number;
    }); 

    if (args.length !== 2) {
        throw new Error('Please provide two arguments - height and weight');
    }

    const height = args[0];
    const weight = args[1];
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
        errorMessage += error.message; 
    }
    console.log(errorMessage);
}