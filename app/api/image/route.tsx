import satori from 'satori'
import {NextRequest, NextResponse} from "next/server";
import {transformItems} from "@/app/api/image/transformItems";
import {borderRadius, colours, styles} from "@/app/api/image/styles";

export const runtime = 'edge';


export async function GET(req: NextRequest, res: NextResponse) {
    const [regular, bold] = await Promise.all([
        fetch(
            new URL('../../../assets/regular.woff', import.meta.url),
        ).then((res) => res.arrayBuffer()),
        fetch(
            new URL('../../../assets/bold.woff', import.meta.url),
        ).then((res) => res.arrayBuffer())
    ]);

    const transformedItems = transformItems([
        {
            "feature_state_value": "Blue",
            "feature_state_value_type": "unicode",
            "environment_name": "Development",
            "feature_value": "False"
        },
        {
            "feature_state_value": 1,
            "feature_state_value_type": "int",
            "environment_name": "Production",
            "feature_value": "True"
        },
        {
            "feature_state_value": "Green",
            "feature_state_value_type": "unicode",
            "environment_name": "Staging",
            "feature_value": "True"
        },
        {
            "feature_state_value_type": "Boolean",
            "environment_name": "QA",
            "feature_value": "False"
        },
        {
            "segment_name": "flagsmith_team",
            "feature_state_value_type": "Boolean",
            "environment_name": "Production",
            "feature_value": "True"
        }
    ])

    const svg = await satori(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 10,
                    backgroundColor: '#22272E',
                    borderRadius: 8,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                }}
            >
                <div style={{
                    display: "flex",
                    flexWrap: 'wrap',
                    flexDirection: "row",
                }}
                >
                    {transformedItems.map((v, index) => {
                        const i = index % Object.keys(colours.main).length;
                        const colourKey = Object.keys(colours.main)[i]
                        const color = colours.main[colourKey as keyof typeof colours.main][500]
                        const color2 = colours.main[colourKey as keyof typeof colours.main][400]
                        return (
                            <div style={styles.row} key={i}>
                                <div style={styles.environment}
                                >
                                    <div style={styles.card}
                                    >
                                        <div style={styles.row}>
                                            <svg height={18} xmlns="http://www.w3.org/2000/svg" className="ionicon"
                                                 viewBox="0 0 512 512"
                                            >
                                                <defs>
                                                    <radialGradient id="grad1" cx="50%" cy="55%" r="50%">
                                                        <stop offset="90%" style={{stopColor: color}}/>
                                                        <stop offset="100%" style={{stopColor: color2}}/>
                                                    </radialGradient>
                                                </defs>
                                                <path
                                                    fill="url(#grad1)"
                                                    d="M416 160a64 64 0 10-96.27 55.24c-2.29 29.08-20.08 37-75 48.42-17.76 3.68-35.93 7.45-52.71 13.93v-126.2a64 64 0 10-64 0v209.22a64 64 0 1064.42.24c2.39-18 16-24.33 65.26-34.52 27.43-5.67 55.78-11.54 79.78-26.95 29-18.58 44.53-46.78 46.36-83.89A64 64 0 00416 160zM160 64a32 32 0 11-32 32 32 32 0 0132-32zm0 384a32 32 0 1132-32 32 32 0 01-32 32zm192-256a32 32 0 1132-32 32 32 0 01-32 32z"
                                                ></path>
                                            </svg>
                                            {`${v.environment_name}`}
                                        </div>
                                        <div style={styles.row}
                                        >
                                            {v.feature_state_value && (
                                                <span style={styles.chip}>
                                                    {v.feature_state_value}
                                                </span>
                                            )}
                                            <div style={{
                                                ...styles.switch,
                                                ...styles.switchActive
                                            }}
                                            >
                                                <div style={styles.switchInner}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div style={styles.row}
                                >
                                    {v.segments?.map((v, i) => (
                                        <div key={i} style={{
                                            ...styles.card,
                                            ...styles.subCard
                                        }}
                                        >
                                            Hi
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        ),
        {
            width: 814,
            height: 318,
            embedFont: false,
            fonts: [
                {
                    name: 'arial',
                    data: regular,
                    weight: 400,
                    style: 'normal',
                },
                {
                    name: 'arial',
                    data: bold,
                    weight: 500,
                    style: 'normal',
                },
            ],
        }
    )
    const headers = new Headers();

    headers.set("Content-Type", "image/svg+xml");

    return new NextResponse(svg, {status: 200, statusText: "OK", headers});

}
