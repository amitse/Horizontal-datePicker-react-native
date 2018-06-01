import React from "react";
import moment from "moment";
import { DateObject, toLongDate } from "./dateObject";
import { Text } from 'react-native';
import { WIDTH_PER_DATE } from "./constants";

export type PureDateItemsProps = {
    item: DateObject,
    index: number,
    onPress: (day: moment.Moment, index:number, i:number) => void
}

export class PureDateItem extends React.PureComponent<PureDateItemsProps> {


    render() {
        return (this.props.item.value.map((day: moment.Moment, index : number) => (
            <Text
                key={toLongDate(day)}
                style={
                    {
                        height: 40,
                        width: WIDTH_PER_DATE,
                        borderColor: "black",
                        borderWidth: 2,
                        textAlign: "center",
                        textAlignVertical: "center"
                    }}
                onPress={this.props.onPress.bind(this, day)}>
                {day.date()}
            </Text>
        )));
    }
}
