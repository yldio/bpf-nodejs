# BPF and Node.js

## Slow DNS version

```sh
tomgco@magellanic $ node dns_slow.js &
```

```sh
tomgco@magellanic $ sudo python3 ./gethostlatency.py
[sudo] password for tomgco: 
TIME      PID    COMM          LATms HOST
16:14:56  12054  node           5.05 google.com
16:14:56  12055  node           0.74 google.com
16:14:56  12056  node           1.13 google.com
16:14:57  12057  node           1.04 google.com
16:14:57  12054  node           1.04 google.com
16:14:57  12055  node           0.91 google.com
16:14:57  12056  node           0.68 google.com
16:14:57  12057  node           1.01 google.com
16:14:57  12054  node           1.02 google.com
16:14:57  12055  node           0.85 google.com
16:14:57  12056  node           0.69 google.com
16:14:57  12057  node           0.84 google.com
16:14:57  12054  node           0.88 google.com
16:14:58  12055  node           0.89 google.com
16:14:58  12056  node           0.87 google.com
16:14:58  12057  node           0.85 google.com
```

### Results

What we can see is that by default NodeJS does not cache DNS requests,
so for every `http.get` we are making a DNS request, slowing our requests
by 1-5ms. (even slower if the dns server has a problem).

## Fast DNS Version

```sh
tomgco@magellanic $ node dns_fast.js &
```

```sh
tomgco@magellanic $ sudo python3 ./gethostlatency.py
[sudo] password for tomgco: 
TIME      PID    COMM          LATms HOST
16:14:56  12055  node           0.74 google.com
```

### Results

We can see that now we have introduced caching using the `dnscache` module in 
npm we only make one request to `google.com`.


This shows how having BPF filters and scripts can allow us to diagnose issues
with our applications on Linux machines.

