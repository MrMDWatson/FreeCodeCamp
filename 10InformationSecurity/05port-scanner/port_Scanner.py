import socket
import datetime

def scan_ports(target, start_port, end_port):
    print(f"Scanning target: {target}")
    print(f"Time started: {datetime.datetime.now()}")
    print(f"Scanning ports from {start_port} to {end_port}...\n")

    # Convert the target host to its IP address
    target_ip = socket.gethostbyname(target)

    # Iterate through the specified range of ports
    for port in range(start_port, end_port + 1):
        # Create a socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(1)  # Set timeout to 1 second

        # Attempt to connect to the port
        result = sock.connect_ex((target_ip, port))

        if result == 0:
            print(f"Port {port}: Open")
        else:
            print(f"Port {port}: Closed")

        sock.close()

    print(f"\nScanning completed at: {datetime.datetime.now()}")

# Example usage
if __name__ == "__main__":
    target_host = "example.com"  # Replace with the target host
    start_port = 1
    end_port = 100

    scan_ports(target_host, start_port, end_port)
