import { useCallback, useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timegrid from '@fullcalendar/timegrid';
import allLocales from '@fullcalendar/core/locales-all';
import { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';

let id = 0;
const Calendar = (): JSX.Element => {
  const [initialEvents, setInitialEvents] = useState([
    {
      id: String(10001),
      title: '2-digit',
      start: new Date().toISOString().split('T')[0],
      categories: [],
    },
    {
      id: String(20002),
      title: '2-digit',
      start: new Date().toISOString().split('T')[0] + 'T14:05:00',
      categories: [],
    },
  ]);

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const handleEvents = useCallback(
    (events: EventApi[]) => setCurrentEvents(events),
    []
  );

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    let title = prompt('Today Todo')?.trim();

    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        id: String(id++),
      });
    }
  }, []);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (window.confirm('삭제 하시겠습니까?')) {
      clickInfo.event.remove();
    }
  }, []);

  return (
    <CalendarCotainer>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timegrid,
          listPlugin,
          timeGridPlugin,
          multiMonthPlugin,
        ]}
        views={{
          timeGridPlugin: {
            type: 'timeGrid',
            duration: { days: 4 },
            buttonText: '4일',
          },
          month: { eventLimit: 12 },
          // listDay: { buttonText: 'list day' },
          listWeek: { buttonText: 'list week' },
          // listMonth: { buttonText: 'list month' },
          multiMonthYear: { buttonText: 'multiMonthYear' },
        }}
        customButtons={{
          btn: {
            text: '주말',
            click: function (MouseEvent, HTMLElement) {
              alert('테스트');
            },
          },
        }}
        headerToolbar={{
          left: 'today prev next',
          center: 'title',

          right:
            'multiMonthYear dayGridMonth timeGridWeek timeGridDay timeGridPlugin listWeek',
        }}
        buttonText={{
          today: '오늘',
          prev: '<',
          next: '>',
          nextYear: 'NextYear',
          prevYear: 'LastYear',
          month: '월',
          week: '주',
          day: '일',
          listWeek: '일정 목록',
          multiMonthYear: '1년',
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
        }}
        height={700}
        contentHeight={600}
        longPressDelay={0}
        eventLongPressDelay={0}
        selectLongPressDelay={0}
        firstDay={1}
        selectMirror={true}
        eventOverlap={true}
        dragScroll={true}
        dayMaxEventRows={true}
        editable={true}
        weekends={true}
        selectable={true}
        dayMaxEvents={true}
        nowIndicator={true}
        navLinks={true}
        allDaySlot={true}
        droppable={true}
        displayEventTime={true}
        displayEventEnd={true}
        businessHours={true}
        handleWindowResize={true}
        stickyHeaderDates={true}
        weekNumbers={false}
        eventTextColor={'white'}
        locale={'ko'}
        dayPopoverFormat={'MM/DD dddd'}
        initialView="dayGridMonth"
        weekNumberCalculation={'ISO'}
        locales={allLocales}
        initialEvents={initialEvents}
        select={handleDateSelect}
        eventsSet={handleEvents}
        eventClick={handleEventClick}
        eventBackgroundColor={'#2196F3'}
        eventBorderColor={'#64B5F6'}
        aspectRatio={1}
      />
    </CalendarCotainer>
  );
};

export default Calendar;

const CalendarCotainer = styled.div`
  width: 60%;
  margin-left: 20rem;
  margin-top: 5rem;
  .fc-today-button {
    border: none;
    background-color: white;
    color: black;
  }
  .fc-prev-button,
  .fc-next-button {
    border: none;
    background-color: white;
    color: black;
    width: 20%;
  }
  .fc-dayGridMonth-button,
  .fc-multiMonthYear-button,
  .fc-timeGridWeek-button,
  .fc-timeGridDay-button,
  .fc-timeGridPlugin-button {
    width: 15%;
    height: 30px;
    font-size: 13px;
    background-color: white;
    color: black;
    border: 1px solid gray;
  }

  .fc-listWeek-button {
    font-size: 0.8rem;
    background-color: tomato;
    margin-top: 10px;
    border: none;
  }
  .fc-event-main-frame {
    height: 1.2rem;
  }
  .fc-toolbar-title {
    display: flex;
    align-items: center;
    padding-right: 60px;
    width: 100%;
  }
`;
