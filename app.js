const PRO_SETUPS = {

    Monza: {
        frontWing: 12,
        rearWing: 8,
        frontSuspension: 30,
        rearSuspension: 12,
        frontRideHeight: 20,
        rearRideHeight: 45,
        brakeBias: 55
    },

    Spa: {
        frontWing: 18,
        rearWing: 14,
        frontSuspension: 28,
        rearSuspension: 14,
        frontRideHeight: 22,
        rearRideHeight: 48,
        brakeBias: 56
    },

    Silverstone: {
        frontWing: 26,
        rearWing: 22,
        frontSuspension: 25,
        rearSuspension: 18,
        frontRideHeight: 23,
        rearRideHeight: 50,
        brakeBias: 55
    },

    Suzuka: {
        frontWing: 30,
        rearWing: 27,
        frontSuspension: 22,
        rearSuspension: 18,
        frontRideHeight: 25,
        rearRideHeight: 52,
        brakeBias: 56
    },

    "Las Vegas": {
        frontWing: 10,
        rearWing: 7,
        frontSuspension: 32,
        rearSuspension: 10,
        frontRideHeight: 18,
        rearRideHeight: 42,
        brakeBias: 54
    }
};

const setupItems = {

    frontWing: [0, 50, "Front Wing"],
    rearWing: [0, 50, "Rear Wing"],

    frontSuspension: [1, 41, "Front Suspension"],
    rearSuspension: [1, 41, "Rear Suspension"],

    frontRideHeight: [10, 50, "Front Ride Height"],
    rearRideHeight: [30, 80, "Rear Ride Height"],

    brakeBias: [50, 60, "Brake Bias"]
};

const panel = document.getElementById("setup-panel");

for (const key in setupItems) {

    const [min,max,label] = setupItems[key];

    panel.innerHTML += `
        <div class="slider-group">
            <label>
                ${label}
                <span id="${key}Value">${min}</span>
            </label>

            <input
                type="range"
                id="${key}"
                min="${min}"
                max="${max}"
                value="${min}"
                oninput="updateValue('${key}')"
            >
        </div>
    `;
}

function updateValue(id){

    document.getElementById(id + "Value").textContent =
        document.getElementById(id).value;
}

function compareSetup(){

    const track =
        document.getElementById("track").value;

    const pro =
        PRO_SETUPS[track];

    let output =
        `=== ${track} 프로 셋업 비교 ===\n\n`;

    let totalDiff = 0;

    for(const key in setupItems){

        const user =
            Number(document.getElementById(key).value);

        const diff =
            user - pro[key];

        totalDiff += Math.abs(diff);

        output +=
            `${setupItems[key][2]} : ${diff > 0 ? "+" : ""}${diff}\n`;
    }

    const avg =
        totalDiff / Object.keys(setupItems).length;

    output += `\n평균 오차 : ${avg.toFixed(1)}\n`;

    if(avg < 3)
        output += "★★★★★ 거의 프로 수준\n";

    else if(avg < 6)
        output += "★★★★☆ 매우 우수\n";

    else if(avg < 10)
        output += "★★★☆☆ 양호\n";

    else
        output += "★★☆☆☆ 개선 필요\n";

    const aero =
        Number(document.getElementById("frontWing").value)
        +
        Number(document.getElementById("rearWing").value);

    output += "\n";

    if(aero > 55){

        output +=
            "고다운포스 셋업\n";
    }
    else if(aero < 25){

        output +=
            "저다운포스 셋업\n";
    }
    else{

        output +=
            "밸런스 셋업\n";
    }

    document.getElementById("results").textContent =
        output;
}