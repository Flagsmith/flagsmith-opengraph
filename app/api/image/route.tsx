import satori from 'satori'

import {ImageResponse} from 'next/og';
import {NextRequest, NextResponse} from "next/server";
import {text} from "stream/consumers";

export const runtime = 'edge';


const borderRadius = 6
const colours = {
    border: "rgba(170, 170, 170, .5)",
    main: {
        purple: {
            500: "rgb(115,64,196)",
            400: "#906af6"
        },
        blue: {
            500: "rgb(64, 108, 196)",
            400: "#6ab9f6"
        },
        red: {
            500: "rgb(196,64,104)",
            400: "#eb6d5a"
        },
        green: {
            500: "#4c9d51",
            400: "#65ab57"
        }
    }
}

export async function GET(req:  NextRequest, res: NextResponse) {
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
                    flexWrap:'wrap',
                    flexDirection: "row",
                    fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                }}
            >
                {items.map((v, i) => {
                    const colourKey = Object.keys(colours.main)[i]
                    const color = colours.main[colourKey as keyof typeof colours.main][500]
                    return (
                    <div key={i} style={{
                        width: "50%",
                        fontSize:14,
                        fontWeight: 500,
                        flex: "0 0 auto",
                        padding: 4,
                        display:"flex",
                    }}
                    >
                        <div style={{
                            width:"100%",
                            padding:8,
                            borderRadius,
                            display:"flex",
                            border: `1px solid ${colours.border}`,
                            justifyContent:"space-between",
                            alignItems:'center',
                        }}>
                            <div style={
                                {
                                    display:"flex",
                                    color
                                }
                            }>
                                {`${v.environment_name}`}
                            </div>
                            <div style={{
                                width:38,
                                height:20,
                                borderRadius:100,
                                backgroundColor:'rgb(104, 55, 252)',
                                padding:2,
                                display:'flex',
                                justifyContent:'flex-end',
                                alignItems:'center',
                            }}>
                                <div style={{width:16,height:16,borderRadius:8,backgroundColor:'white'}}/>
                            </div>
                        </div>

                    </div>
                )
                })}
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

    return new NextResponse(svg, { status: 200, statusText: "OK", headers });

}
