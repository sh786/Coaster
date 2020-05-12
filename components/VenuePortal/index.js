import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Button, Text, TouchableOpacity, ScrollView} from 'react-native';
import { fetchBar, fetchHeadCountByBarId } from '../../redux/actions';
import EventItem from './EventItem';
import { styles } from './styles/VenuePortalStyles';
import Icon from '../Common/Icon';

import { useDispatch, useSelector } from 'react-redux';

const VenuePortal = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.user;
	});

	const venue = useSelector(state => state.venuePortal.venue);
	const {events} = venue;

	useEffect(() => {
		dispatch(fetchBar(user.barId));
		dispatch(fetchHeadCountByBarId(user.barId));
	}, []);

	return (
		<View style={styles.container} >
			<View style={styles.headingContainer}>
				<Icon
					style={styles.headingIcon}
					name='md-calendar'
					size={20}
					color='black'
				/>
            <Text style={styles.venuePageHeading}>Events</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString([], { dateStyle: 'long' })}
              </Text>
            </View>
          </View>
			<ScrollView style={{ display: 'flex', flex: 1, width: '100%' }}>
				<View styles={styles.eventsContainer}>
					{events &&
						events.map((e) => {
							return (
								<TouchableOpacity key={e.id}>
									<EventItem
										event={e}
										venue={venue}
										navigation={navigation}
										handleEventClick={() => navigation.navigate('EventList', {event: e})}
									/>
								</TouchableOpacity>
							);
						})}
				</View>
			</ScrollView>
			<Button title="Lobby"
				onPress={() => navigation.navigate('Lobby')} />
		</View>
	);
};

VenuePortal.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default VenuePortal;
