import * as React from 'react';
import { VirtualizedList } from 'react-native';
import moment from "moment";
import _ from "underscore";
import { DateObject, toLongDate } from './dateObject';
import { PureDateItem } from './dateItem';
import { WIDTH_PER_DATE, DATES_PER_SCREEN } from './constants';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
interface IState {
    currentDate: string;
}
export class DatePicker extends React.PureComponent<any, IState> {
    listRef?: VirtualizedList<DateObject>
    constructor(props: any) {
        super(props);
        this.state = {
            currentDate: toLongDate(moment().startOf('day'))
        }
    }

    getItem(data: any, screenNumber: number): DateObject {
        const currentDate = moment(this.state.currentDate);
        const dateOffset = (screenNumber - 1) * DATES_PER_SCREEN;

        let week = [];
        for (let i = -3; i <= 3; i++) {
            let day = currentDate.clone().add(dateOffset + i, 'day');
            week.push(day);
        }
        const baseDate = toLongDate(week[3]);
        return { key: baseDate, value: week }
    }

    onPress(date: moment.Moment) {
        const newDate = toLongDate(date.clone())
        this.setState({ currentDate: newDate });
    }

    keyExtractor(item: DateObject, index: number) {
        return item.key;
    }
    onScrollEndDrag(e: NativeSyntheticEvent<NativeScrollEvent>) {

        const scrollXPosition = e.nativeEvent.contentOffset.x;
        const dateOffset = (- 1) * DATES_PER_SCREEN;
        const currentDate = moment(this.state.currentDate);
        const startDate = currentDate.clone().add(dateOffset - 3, 'day');
        const DatesDistanceFromStartDate = Math.round(scrollXPosition / WIDTH_PER_DATE);

        const newDate = toLongDate(startDate.clone().
            add(DatesDistanceFromStartDate + 3, 'day'));
        this.setState({ currentDate: newDate });
    }
    componentDidUpdate() {
        this.listRef.scrollToIndex({ index: 1, animated: false });
    }

    render() {
        return (
            <VirtualizedList
                showsHorizontalScrollIndicator={false}
                getItemCount={() => 3}
                initialScrollIndex={1}
                pagingEnabled
                getItem={this.getItem.bind(this)}
                keyExtractor={this.keyExtractor.bind(this)}
                horizontal={true}
                data={[]}
                extraData={this.state.currentDate}
                snapToInterval={WIDTH_PER_DATE}
                decelerationRate="fast"
                ref={ref => this.listRef = ref}
                onScrollEndDrag={(e) => this.onScrollEndDrag(e)}
                renderItem={(props) =>
                    (
                        <PureDateItem {...props} onPress={this.onPress.bind(this)} />
                    )}
            />
        );
    }
}