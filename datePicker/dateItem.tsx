import React from "react";
import moment from "moment";
import { DateObject, toLongDate } from "./dateObject";
import { Text, Animated, View } from 'react-native';
import { WIDTH_PER_DATE, DATES_PER_SCREEN } from "./constants";
import { LayoutChangeEvent, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";

export type PureDateItemsProps = {
    item: DateObject,
    index: number,
    onPress: (day: moment.Moment, index: number, i: number) => void
}
export type PureDateItemsState = {
}
export class PureDateItem extends React.PureComponent<PureDateItemsProps, PureDateItemsState> {

    animatedOpacity: Animated.Value[];
    screenWidth: number;
    constructor(props: PureDateItemsProps) {
        super(props);
        this.animatedOpacity = new Array<Animated.Value>();
        this.screenWidth = Dimensions.get("window").width;
        for (let index = 0; index < DATES_PER_SCREEN; index++) {
            this.animatedOpacity.push(new Animated.Value((this.screenWidth / 2) - WIDTH_PER_DATE / 2));
        }
    }

    getOpacityStyle(animatedOpacity: Animated.Value) {
        return animatedOpacity.interpolate({
            inputRange: [
            -WIDTH_PER_DATE / 2, 0,
            (this.screenWidth / 2) - 3 * WIDTH_PER_DATE / 2,
            (this.screenWidth / 2) - WIDTH_PER_DATE / 2,
            (this.screenWidth / 2) + WIDTH_PER_DATE / 2,
            this.screenWidth - WIDTH_PER_DATE,
            this.screenWidth],
            outputRange: [1, 0, 0.2, 1, 0.2, 0, 1],
            extrapolate: "clamp"
        });
    }



    renderChildren() {
        return (this.props.item.value.map((day: moment.Moment, index: number) => (

            <View
                key={toLongDate(day)}
                style={
                    {
                        height: 40,
                        flex: 1,
                        borderColor: "black",
                        borderWidth: 2,
                        flexDirection: "column",
                    }
                }
                onLayout={Animated.event([
                    { nativeEvent: { layout: { x: this.animatedOpacity[index] } } }
                ])}

            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: "column",
                    }}
                    onPress={this.props.onPress.bind(this, day)}>
                    <Animated.View
                        style={
                            {
                                flex: 1,
                                opacity: this.getOpacityStyle(this.animatedOpacity[index])
                            }}>
                        <Text style={
                            {
                                textAlign: "center",
                                textAlignVertical: "center"
                            }}>
                            {day.format("MMM")}
                        </Text>
                    </Animated.View>
                    <Text
                        style={
                            {
                                flex: 1,
                                textAlign: "center",
                                textAlignVertical: "center"
                            }}>
                        {day.date()}
                    </Text>

                </TouchableOpacity>
            </View>
        )
        ))
    }


    render() {
        return (
            <View
                style={
                    {
                        flexDirection: "row",
                        height: 40,
                        width: this.screenWidth,
                    }
                }>
                {this.renderChildren()}
            </View>
        );
    }
}
