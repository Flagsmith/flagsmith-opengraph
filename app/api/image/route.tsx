import satori from 'satori'

import {ImageResponse} from 'next/og';
import {NextRequest, NextResponse} from "next/server";
import {text} from "stream/consumers";

export const runtime = 'edge';


const borderRadius = 6
const colours = {
    border: "rgba(68,76,86,0.58)",
    title: "rgb(197, 209, 222)",
    main: {
        purple: {
            500: "#7f47e6",
            400: "#906af6"
        },
        blue: {
            500: "#478BE6",
            400: "#6ab9f6"
        },
        red: {
            500: "rgb(196,64,104)",
            400: "#eb5f5a"
        },
        green: {
            500: "#57AB5A",
            400: "#6dc370"
        }
    }
}

export async function GET(req: NextRequest, res: NextResponse) {

    console.log(req.headers.get("cookie"))
    // Make sure the font exists in the specified path:
    const [regular, bold] = await Promise.all([
        fetch(
            new URL('../../../assets/regular.woff', import.meta.url),
        ).then((res) => res.arrayBuffer()),
        fetch(
            new URL('../../../assets/bold.woff', import.meta.url),
        ).then((res) => res.arrayBuffer())
    ]);

    const items = [
        {
            "feature_state_value": "original feature value b",
            "feature_state_value_type": "unicode",
            "environment_name": "Development",
            "feature_value": "False"
        },
        {
            "feature_state_value": 1,
            "feature_state_value_type": "int",
            "environment_name": "original",
            "feature_value": "True"
        },
        {
            "feature_state_value": "original",
            "feature_state_value_type": "unicode",
            "environment_name": "test feature version 6",
            "feature_value": "True"
        },
        {
            "feature_state_value": "False",
            "feature_state_value_type": "Boolean",
            "environment_name": "dev clone",
            "feature_value": "False"
        }
    ]
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
                    {items.map((v, i) => {
                        const colourKey = Object.keys(colours.main)[i]
                        const color = colours.main[colourKey as keyof typeof colours.main][500]
                        const color2 = colours.main[colourKey as keyof typeof colours.main][400]
                        return (
                            <div key={i} style={{
                                width: "100%",
                                fontSize: 16,
                                fontWeight: 500,
                                flex: "0 0 auto",
                                padding: 4,
                                display: "flex",
                            }}
                            >
                                <div style={{
                                    width: "100%",
                                    padding: 12,
                                    borderRadius,
                                    backgroundColor:"rgba(0,0,0,.1)",
                                    display: "flex",
                                    border: `1px solid ${colours.border}`,
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                }}
                                >
                                    <div style={
                                        {
                                            display: "flex",
                                            alignItems: 'center',
                                            gap: 8,
                                            color: colours.title
                                        }
                                    }
                                    >
                                        <svg height={18} xmlns="http://www.w3.org/2000/svg" className="ionicon"
                                             viewBox="0 0 512 512"
                                        >
                                            <defs>
                                                <radialGradient id="grad1" cx="50%" cy="55%" r="50%">
                                                    <stop offset="90%" style={{stopColor:color}} />
                                                    <stop offset="100%" style={{stopColor:color2}} />
                                                </radialGradient>
                                            </defs>
                                            <path
                                                fill="url(#grad1)"
                                                d="M416 160a64 64 0 10-96.27 55.24c-2.29 29.08-20.08 37-75 48.42-17.76 3.68-35.93 7.45-52.71 13.93v-126.2a64 64 0 10-64 0v209.22a64 64 0 1064.42.24c2.39-18 16-24.33 65.26-34.52 27.43-5.67 55.78-11.54 79.78-26.95 29-18.58 44.53-46.78 46.36-83.89A64 64 0 00416 160zM160 64a32 32 0 11-32 32 32 32 0 0132-32zm0 384a32 32 0 1132-32 32 32 0 01-32 32zm192-256a32 32 0 1132-32 32 32 0 01-32 32z"
                                            ></path>
                                        </svg>
                                        {`${v.environment_name}`}
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        alignItems: 'center',
                                        gap: 8
                                    }}
                                    >
                                        {v.feature_state_value && (
                                            <span style={{
                                                borderRadius,
                                                backgroundColor: 'rgba(29, 18, 62, 0.5)',
                                                border: '1px solid rgba(149, 108, 255, 0.32)',
                                                color: 'rgb(144, 106, 246)',
                                                textWrap: 'nowrap',
                                                display: "flex",
                                                padding: "5px 12px 5px 12px"
                                            }}
                                            >
                                                {v.feature_state_value}
                                            </span>
                                        )}
                                        <div style={{
                                            width: 41,
                                            height: 24,
                                            borderRadius: 100,
                                            backgroundColor: 'rgb(104, 55, 252)',
                                            color: 'rgb(144, 106, 246)',
                                            padding: 3,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                        }}
                                        >
                                            <div style={{
                                                width: 18,
                                                height: 18,
                                                borderRadius: 9,
                                                backgroundColor: 'white'
                                            }}
                                            />
                                        </div>
                                    </div>

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
