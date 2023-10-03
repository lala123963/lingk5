// new Env("爱思签到")
// cron: 30 8 * * *
var unirest = require('unirest');
var req = unirest('POST', 'https://usercenter2.i4.cn/saveMemberSign.xhtml')
  .headers({
    'Host': 'usercenter2.i4.cn',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': '%E5%85%A8%E8%83%BD%E7%89%88/3 CFNetwork/1390 Darwin/22.0.0',
    'Connection': 'keep-alive',
    'Accept': '*/*',
    'token': 'famUk28DIsJkGIL3hVw/KfG7OyRgvRyxN7PnI/%2BBQgP/UpAumecl%2BcAz4/o//07YuFBJGRDPVaQZbn14L16XxO2fFWUrlQtSm60Rm1IuGFoA0nq/V52HwZUyUp93yvlB89/LSJSEMeRE6L5qFjpnZV3t0CqO8MZAKKIYebthlIEUNeRBorJqCY35TmCimwtQNeXr7zITBLf4yVHn2cjjAOokxkmjkgohBOSB/BAjmumZPoTnIZrsVPLtHCDpJM85CT%2Btt1YgPbINMhVPZ1rhwDAAr9Y2VUknkJKXd1miXR1IsmJpRiyvXGVDIW1eIpNrHQO5fDDELOu0k8/WfTUmfW%2Bf4s7T208eAQjaZOSCJhjgZ1hRWYgoK4X3zB4K%2BG6FsZLLZUZQwQiQqtBW%2BPb8Ns0vO89GnUiEtZuoVb7rWG2n%2BNPgGGyiF03%2B3nMMpT8AmWmhEmTikg20l1WR4fSUj/MfdoGZcrcNOBWuVCtTeF%2B79AIovPsctoHeRINOoXGWL9nojB4LuWk06CBSds9EpEJrAUHGTdh85Ac5GJyp8spOJkMz4gvQU8rKO6Nq0jMCqPsSBfEW/9ouUB7Q50UbpkOIHxyLGrNm7yRtluLPeH%2BQrWj8spA/GF8YTCfmaqLLw%2BD6EOfq1PTOaTBnoyg2zDNnVju1swRaC9tYO9XQul2Dg8yz1kTotVvjkNbt2wox7lHw%2Bwo3siRpiugaPbvvx4U6KM9ps6lfg5BlGaALe75yLhDmoWVycyUTr4u0f8vOUsLwdbhiq7UlO3uDQr9gpVI5NQu2HYbtdBIzEgGWTrhYM9LCeJTiFJPadMafX8lipMvv2ROgVTqHRHPAAAaPZGtPPvSzECjaDmJKzUKoDPH/0zveZMwEnEAupZUfBdNlUVwE9GvwD7fQ8W2qr6bCaNweG2lnJeFqa3sdcFQuF05klmset0LvSQPALz8oD2x0HomECIdS0Va05YoY5EP4AZ5PhoqymhOebHG2nyY44onr3igxQHdZpKoQrR%2BHd',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9'
  })
  .send('json=C+NB/uM7TXsgPoX6u95em5UoHh1kOu2G7kp/1Frn8B/Re40Uzv3gCNu8DOpr2Fa6XDX+Z0GVkA97Sr9Q/LBFqb1OHCZ24niTOgTk8PP80w3cSI5rCOA41Cw4xTsmWFtww5Zyd4sl1DFOioXiozxHuQfB9Ss3WhrMRxIGX2toZgplMh1Gk0+fxvIdPFCO5lADD5XtLZJmtAp6i6VYki76UNwbFzmjct/ET7qlQ9xTfn1mnAEHMfQfjF49DvgPCPhuZBenEvzHT0LK0TQDKGcXMQ7xr1oj9xay6REnB3SoQ3DGNwABU9jsr+1tPbJKUeSEFGPBLFJJvwMUmZMFMY5i4JstBWp8r8ZWBjjFEE9V4/Vu1MA0bI5cVdFNRAjqY+7pYPF3yRS79FPv1Z682/qBQJy0ryl9aqSWGb6cLx+oGnXWKE10RuzC++/nZgTsg8MlrG12kAUMD/CaUCJCwnVODCQGC8t/sHwUfMOdh50gBF4fBVTM96EZ7r5OnuZnUiggVzVH4kzWiPHMm8Fhr2+CLLZ6uyNtNsEHcD+L/YUEPceSLWWJLZBcxMynw+KKEaR4FK3ITaTEIXt9ZyasM1vBPdJSPaSUz7Q3upP8qiFIRlw0zf2zGdxMzgYLW1yeb9Uqcb3i80Ow4bIChRZVDbz30HG28syVLuqFgp6l/UG6d/JaHE+KYQqZfsTO6L54mO8oEX9VzO7+KoeN4O3S1E1pXK+KdHUiYaYB3Oci/Ne2Nt0XBuQDlRNr5RixD1sOUl4oW7uTC3lPaIp37Evl3r4pQ7deIhw56PfFiYQw3aWMEjQ5jI8U2P9Zh+J1v3XsglComkDsk8Z4Wr65wo+XQpF9zGf+jlyx5IRZXMZpTeN/wmziQoJjxjytpF8RnHrL4/hAk83YYYOzVeaz+PTzrkJvF2aRQUKp9ga4DkxGk70qnf6MLxchAfMsNa2/zY8ctxFHhxCPFxzHw77CMHMo9OWZVbQeUQHqg/79+TER0u/PzlZUxyRSjd5rIP8g5fM6a6DGP7DSVwYtfZd533ZAFiaplfnXt/WlhmRAQf1zBlBhpBTC1o6bZhGYQAieI8ZL2xQm2DD9eTwDGzZGYVm6ltt8Wq5Zdy81oi9akp9rqA+cZEGL+uPoLlA5cbWJ1MbkaDK0z3tmtCoE4VcilDOv0CD2gafcWEcZ0nhFNCDwvEbtb1g=')
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });
