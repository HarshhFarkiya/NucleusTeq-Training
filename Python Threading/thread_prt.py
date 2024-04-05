#import threading
import time
import concurrent.futures
start=time.perf_counter()
def do_something(sec):
	print(f"Sleeping started for {sec} sec")
	time.sleep(sec)
	return "Sleeping Done"
with concurrent.futures.ThreadPoolExecutor() as executor:
	secs=[4,5,7,8,1,2]
	results=[executor.submit(do_something,sec) for sec in secs]
	for result in concurrent.futures.as_completed(results):
		print(result.result()) 
#t1=threading.Thread(target=do_something)
#t1.start()
#t2=threading.Thread(target=do_something)
#t2.start()
#t1.join()
#t2.join()
end=time.perf_counter()

print(f"execution end in {end-start}")

