import {CSSProperties} from "react";

export const borderRadius = 6
export const colours = {
    border: "rgba(68,76,86,0.58)",
    grey: "rgba(195,195,195,0.82)",
    greyLight: "rgba(255,255,255,0.82)",
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
        },
        yellow: {
            500: "#aba157",
            400: "#c3c06d"
        },
        orange: {
            500: "#ab7957",
            400: "#c3926d"
        },
        teal: {
            500: "#57ab88",
            400: "#6dc398"
        },
        pink: {
            500: "#ab579c",
            400: "#a86dc3"
        },
    }
}

export const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        backgroundColor: '#22272E',
        borderRadius: 8,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    } as CSSProperties,
    row: {
        alignItems: 'center',
        color: colours.title,
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    } as CSSProperties,
    column: {
        color: colours.title,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    } as CSSProperties,
    indent: {
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
        marginLeft: 10
    } as CSSProperties,
    environment: {
        width: "100%",
        fontSize: 16,
        fontWeight: 500,
        flex: "0 0 auto",
        display: "flex",
    } as CSSProperties,
    card: {
        width: "100%",
        padding: 12,
        borderRadius,
        backgroundColor: "rgba(0,0,0,.2)",
        display: "flex",
        flexWrap: 'wrap',
        border: `1px solid ${colours.border}`,
        alignItems: 'center',
    } as CSSProperties,
    subCard: {
        padding:8,
        backgroundColor: "rgba(0,0,0,.1)",
    } as CSSProperties,
    chip: {
        borderRadius,
        fontSize: 13,
        backgroundColor: 'rgba(29, 18, 62, 0.5)',
        border: '1px solid rgba(149, 108, 255, 0.32)',
        color: 'rgb(144, 106, 246)',
        textWrap: 'nowrap',
        display: "flex",
        padding: "3px 6px",
        paddingRight: "4px",
        textAlign: 'center'
    } as CSSProperties,
    switch: {
        width: 41,
        height: 24,
        borderRadius: 100,
        backgroundColor: 'rgb(104, 55, 252)',
        color: 'rgb(144, 106, 246)',
        padding: 3,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    switchActive: {
        backgroundColor: 'rgb(104, 55, 252)',
        justifyContent: 'flex-end',
    },
    switchInner: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'white'
    }
}
