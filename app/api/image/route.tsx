import satori from 'satori'
import {NextRequest, NextResponse} from "next/server";
import {transformItems} from "@/app/api/image/transformItems";
import {borderRadius, colours, styles} from "@/app/api/image/styles";
import {FC, ReactNode} from "react";

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
const items = [
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
        "feature_state_value": "Yellow",

        "feature_state_value_type": "Boolean",
        "environment_name": "Production",
        "feature_value": "True"
    },
    {
        "segment_name": "beta_users",
        "feature_state_value": "Orange",

        "feature_state_value_type": "Boolean",
        "environment_name": "Production",
        "feature_value": "True"
    },
    {
        "segment_name": "50%_split",
        "feature_state_value": "Green",
        "feature_state_value_type": "Boolean",
        "environment_name": "Production",
        "feature_value": "True"
    }
]
    const transformedItems = transformItems(items)


    type EnvironmentIconType = {
        color: string,
        color2: string
    }

    const EnvironmentIcon: FC<EnvironmentIconType> = ({
                                                          color,
                                                          color2
                                                      }) => {
        return (
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
        )
    }
    const SegmentIcon: FC<EnvironmentIconType> = ({
                                                      color,
                                                      color2
                                                  }) => {

        return (
            <svg height={18} viewBox="0 0 21 21">
                <linearGradient id="grad1" cx="50%" cy="55%" r="50%">
                    <stop offset="75%" style={{stopColor: color}}/>
                    <stop offset="100%" style={{stopColor: color2}}/>
                </linearGradient>
                <path
                    d="M21.112 11.52H11.62l6.321 6.321c.242.242.64.261.888.027a9.58 9.58 0 002.925-5.634c.054-.379-.26-.714-.642-.714zm-.634-2.592A9.623 9.623 0 0011.552 0c-.365-.025-.672.283-.672.648V9.6h8.95c.366 0 .674-.306.648-.671zM8.96 11.52V2.028c0-.382-.336-.696-.714-.642-4.766.673-8.41 4.838-8.24 9.829.174 5.125 4.587 9.328 9.715 9.264a9.525 9.525 0 005.41-1.761c.317-.224.337-.69.063-.963L8.96 11.52z"
                    fill="url(#grad1)"
                    fill-rule="evenodd"
                ></path>
            </svg>
        )
    }


    type ValueType = {
        icon: ReactNode
        title: string,
        value: any
        enabled: string | boolean
    }

    const Value: FC<ValueType> = ({
                                      title,
                                      value,
                                      icon,
                                      enabled
                                  }) => {
        const enabledBool = enabled === true || `${enabled}`.toLowerCase() === 'true'
        const isString = typeof value === 'string'
        return (
            <div style={{
                ...styles.row,
                width: "100%",
                justifyContent: 'space-between'
            }}
            >
                <div style={styles.row}>
                    {icon}
                    {`${title}`}
                </div>
                <div style={styles.row}
                >
                    {value && (
                        <>
                            <span style={styles.chip}>
                                {isString && '"'}
                                {value}
                                {isString && '"'}
                            </span>
                        </>
                    )}
                    <div style={enabledBool ? {
                        ...styles.switch,
                        ...styles.switchActive
                    } : {...styles.switch}}
                    >
                        <div style={styles.switchInner}
                        />
                    </div>
                </div>
            </div>
        )
    }


    const svg = await satori(
        (
            <div
                style={styles.container}
            >
                <div style={{
                    ...styles.row,
                    flexWrap: 'wrap',
                }}
                >
                    {transformedItems.map((v, index) => {
                        const i = index % Object.keys(colours.main).length;
                        const colourKey = Object.keys(colours.main)[i]
                        const color = colours.main[colourKey as keyof typeof colours.main][500]
                        const color2 = colours.main[colourKey as keyof typeof colours.main][400]
                        return (
                            <div style={styles.column} key={i}>
                                <div style={styles.environment}>
                                    <div style={styles.card}
                                    >
                                        <Value icon={<EnvironmentIcon color={color} color2={color2}/>}
                                               title={v.environment_name} value={v.feature_state_value}
                                               enabled={v.feature_value}
                                        />
                                    </div>
                                </div>
                                {!!v.segments?.length && (
                                    <div style={styles.indent}>
                                        {v.segments?.map((v, i) => (
                                            <div key={i} style={{
                                                ...styles.card,
                                                ...styles.subCard
                                            }}
                                            >
                                                <Value icon={<SegmentIcon color={colours.grey} color2={colours.greyLight}/>}
                                                       title={v.segment_name!} value={v.feature_state_value}
                                                       enabled={v.feature_value}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        ),
        {
            width: 814,
            height: items.length*60,
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
