export function uvAdvice(uv){ 
    if(uv >=  0.0 && uv <=2.0) return "its safe for normal outdoor activities.";
    else if (uv <=5.0) return "it can cause skin and eye damage after long exposure.";
    else if (uv <= 7.0) return "it has high risk of harm.";
    else return "you're cooked.";
}

export function rainAdvice(willItRain, chancesOfRain){ 
    if(willItRain) return "The chances of raining is: " + chancesOfRain + "%";
    else return "It will not rain today"
}

export function convertTimeEpoch(epoch) { 
    const date = new Date(epoch * 1000);
    
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
export function convertDateEpoch(epoch) {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString('en-US');
}