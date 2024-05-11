import satori from 'satori'

import {ImageResponse} from 'next/og';
import {NextRequest, NextResponse} from "next/server";
import {text} from "stream/consumers";

export const runtime = 'edge';


const borderRadius = 6
const colours = {
    border: "rgb(68, 76, 86)",
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
            400: "#eb6d5a"
        },
        green: {
            500: "#57AB5A",
            400: "#65ab57"
        }
    }
}

export async function GET(req:  NextRequest, res: NextResponse) {

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
                    display:"flex",
                    flexDirection:"column",
                    padding:10,
                    backgroundColor:'#22272E',
                    borderRadius: 8,
                    fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                }}
            >
                <div style={{
                    display: "flex",
                    flexWrap:'wrap',
                    flexDirection: "row",
                }}>
                    {items.map((v, i) => {
                    const colourKey = Object.keys(colours.main)[i]
                    const color = colours.main[colourKey as keyof typeof colours.main][500]
                    return (
                    <div key={i} style={{
                        width: "100%",
                        fontSize:16,
                        fontWeight: 500,
                        flex: "0 0 auto",
                        padding: 4,
                        display:"flex",
                    }}
                    >
                        <div style={{
                            width:"100%",
                            padding:12,
                            borderRadius,
                            display:"flex",
                            border: `1px solid ${colours.border}`,
                            justifyContent:"space-between",
                            alignItems:'center',
                        }}>
                            <div style={
                                {
                                    display:"flex",
                                    color:colours.title
                                }
                            }>
                                {`${v.environment_name}`}
                            </div>
                            <div style={{
                                display:"flex",
                                alignItems:'center',
                                gap: 8
                            }}>
                                {v.feature_state_value && (
                                    <span style={{
                                        borderRadius,
                                        backgroundColor: 'rgba(29, 18, 62, 0.5)',
                                        border:'1px solid rgba(149, 108, 255, 0.32)',
                                        color:'rgb(144, 106, 246)',
                                        textWrap:'nowrap',
                                        display:"flex",
                                        padding:"5px 12px 5px 12px"
                                    }}>
                                        {v.feature_state_value}
                                    </span>
                                )}
                                <div style={{
                                    width:41,
                                    height:24,
                                    borderRadius:100,
                                    backgroundColor:'rgb(104, 55, 252)',
                                    color: 'rgb(144, 106, 246)',
                                    padding:3,
                                    display:'flex',
                                    justifyContent:'flex-end',
                                    alignItems:'center',
                                }}>
                                    <div style={{width:18,height:18,borderRadius:9,backgroundColor:'white'}}/>
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

    return new NextResponse(svg, { status: 200, statusText: "OK", headers });

}
