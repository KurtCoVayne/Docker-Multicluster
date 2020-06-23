import time
import signal
from threading import Thread, Event
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

last_call = time.time()


def gracefulKiller(api, call):
	"""
	"""
	pass


def has_time_passed_out(start, duration):
	return start + duration <= time.time()


class Watcher:
	def __init__(self, delay, max_time, watchable):
		self.delay = delay
		self.observer = Observer()
		self.max_time = max_time
		self.DIRECTORY_TO_WATCH = watchable

	def run(self):
		event_handler = Handler()
		self.observer.schedule(
			event_handler, self.DIRECTORY_TO_WATCH, recursive=True)
		self.observer.start()
		try:
			while True:
				time.sleep(delay)
				if has_time_passed_out(last_call, self.max_time):
					print("TIME HAS PASSED")
					self.observer.stop()
					gracefulKiller(..., ...)
					break
		except:
			print("Error")
			self.observer.stop()
			gracefulKiller(..., ...)

		self.observer.join()


# Just a static class that handles fs events
class Handler(FileSystemEventHandler):

	@staticmethod
	def on_any_event(event):
		if event.is_directory:
			pass
		print(f"Event call type: {event.event_type} in {event.src_path}, resetting timer")
		last_call = time.time()


# Add argparsing here
if __name__ == '__main__':
	delay = 2
	max_time = 1800
	DIRECTORY_TO_WATCH = "C:\\Users\\Usuario\\Desktop"
	w = Watcher(delay, max_time, DIRECTORY_TO_WATCH)
	w.run()
