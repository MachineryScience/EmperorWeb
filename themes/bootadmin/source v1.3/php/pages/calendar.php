<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li>Calendar</li>
</ul>
<div class="separator"></div>

<h2 class="glyphicons calendar"><i></i> Calendar</h2>
<p>BootAdmin provides a full-sized, drag &amp; drop calendar. It uses AJAX to fetch events on-the-fly for each month and is easily configured to use your own feed format, plus there's an extension provided for Google Calendar.</p>
<div class="separator"></div>

<div class="row-fluid">
	<div class="span9">
		<div class="well">
			<div id="calendar"></div>
		</div>
	</div>
	<div class="span3" id="external-events">
		<div class="well">
			<h4 class="glyphicons calendar"><i></i> Draggable Events</h4>
			<hr class="separator" />
			<ul>
				<li class="glyphicons move"><i></i> My Event 1</li>
				<li class="glyphicons move"><i></i> My Event 2</li>
				<li class="glyphicons move"><i></i> My Event 3</li>
				<li class="glyphicons move"><i></i> My Event 4</li>
				<li class="glyphicons move"><i></i> My Event 5</li>
			</ul>
			<hr class="separator" />
			<div class="uniformjs">
				<label for="drop-remove" class="checkbox">
					<input type="checkbox" class="checkbox" id="drop-remove" /> 
					remove after drop
				</label>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">

	$(document).ready(function() 
	{
	
		/* initialize the external events
		-----------------------------------------------------------------*/
	
		$('#external-events ul li').each(function() 
		{
		
			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
			var eventObject = {
				title: $.trim($(this).text()) // use the element's text as the event title
			};
			
			// store the Event Object in the DOM element so we can get to it later
			$(this).data('eventObject', eventObject);
			
			// make the event draggable using jQuery UI
			$(this).draggable(
			{
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0,  //  original position after the drag,
				start: function() { if (typeof mainYScroller != 'undefined') mainYScroller.disable(); },
		        stop: function() { if (typeof mainYScroller != 'undefined') mainYScroller.enable(); }
			});
			
		});
	
		/* initialize the calendar
		-----------------------------------------------------------------*/
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true,
			droppable: true,
			events: "ajax.php?section=calendarEvents",
			drop: function(date, allDay) 
			{
				// retrieve the dropped element's stored Event Object
				var originalEventObject = $(this).data('eventObject');
				
				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $.extend({}, originalEventObject);
				
				// assign it the date that was reported
				copiedEventObject.start = date;
				copiedEventObject.allDay = allDay;
				
				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
				
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
				
			}
		});
		
		
	});

</script>