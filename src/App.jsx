import { useState, useRef, useEffect, useCallback } from "react";

// ── Preconnect hints (melhora LCP/FCP) ───────────────────────────────────────
const PreconnectHints = () => {
  useEffect(() => {
    const hints = [
      { rel: "preconnect", href: "https://klhcrhlpumyhuwevseif.supabase.co" },
      { rel: "dns-prefetch", href: "https://klhcrhlpumyhuwevseif.supabase.co" },
      { rel: "preconnect", href: "https://withered-rice-255b.suavidadewil.workers.dev" },
    ];
    hints.forEach(({ rel, href }) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
    // Preload dos ícones PWA do service worker
    ["/icon-192.png", "/icon-512.png"].forEach(href => {
      if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
  return null;
};

const PWA_ICON_192 = "/icon-192.png";
const PWA_ICON_512 = "/icon-512.png";

const LOGO_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAApCAYAAABZa1t7AAANQUlEQVR42mWYe4xc1X3HP79z7p3XzszOev1Ye3e9NrYxJbFxjI0dSni1IilNCI9UhQo1omqURCGorYr6EJFcpKiPqIrSEJWWtilSEhGFqKSoTdQWakqgPFIIYPxavxav7X15X7OzOzP33vPrH+fe2XGr0dV9zL33fO/vfL/f3+93ZLetqREwIhjAqmBEsPh9dt2QXff3FI2hGATYyEGzgaOJ4nAYHHk0V6KdM7SSmMQpakCdEokSq+JQEvVbjKKA61x3BFYEAYwKVsCKwaYAjAiSgrRAIIYwcfT25Ck4pbDYYP2aMsM338iaq68hLJVpLs1z8fRxxt5+n0tT80T5Ki5nMO02lf4il2aWWDaGlgrgUCAAEgBRRMWHYW/QpxbxYLKNLGIGAUIgRCg4x4aRPvLLLdZNx1z/W/dzw6EvUcpV0J8dYXlsnIINsCMbWSy2+PmrL/Hy157m0mSDLQe2cvsj9/JPX3uGI8enWFJHW310khSiQ/2xqo9YB0wXKItgEHIi5BzUjHLtDVtpflBnV7yOa558lG2fvY/mX/wdP/jmt3jr4hgNEvIIu6tr+eS+m7j5N+7hqn/+GIf/+HGOvTbKicNHWb5QJx872oEQq6IioCD4LTuxI7bnkBUPIujaWxFyGHpsQH8Uc8cDt+AmWxys97Dh4d9k+8MPUv/Ml/nbJ77OW4kSl3pxxSpRscLpJOHM+Cm2v3eWZDxh6LGHaI+d5LVnXmDNtiHWbh1g8sIMiTEoKSLxsDJsxhMbbPq/BQKEUAylwFJoNPnEAzdRKg+yf+Aaylu3kH/g49jHn+KVF17kXKWPcpCnHbdpRm2idpuSWM5JgeemzzA4OcXsoR9y4E/+iKGrBzFqKPQUCLIA6CqHO1hEMEbAYjAYrAoBhgBDwRjMSsJ1ezcxcmAvVVvjw8UaFzf1Ur0wQ+P5w5ySNqEaGnGMU0C9utrOkTOW95ZWODk9zm5T5swTP2H/oUcZPXKCky8fJwhDr/B0liSlUpCKz1xJfOM3hNAE1JIWNz14K41Jw84dV9Eam6YZCpM/fYu52VnqCklqI6EY8mII0kGMwooNeHfyA8LhTYSvHaNpexj4xYPEcRvn7+qMnT0nHWtKXxx0qTK0QrDi2LVrAz3rB8k1Q4qVEhIltCcuc/TYCertNgUyThryxpI3hlAMofEAE4HLKCzMs7HSx6XD/8OHP30bLokJTbA6bel7MsEJYDp/pCEMMITWko9bfOiXdlIfXWDtml4agaEdtem5cJljZ05z0ilFFUoIOTEUxJAjAyeExoJTqvkS8dQMhQAWj59jx9Uj1DYMkIsSAjEeUMfIPSjx5PfOLqo+uAIWSwXHwJ4tXD41SyEMaG0Z5NzCPENJwPSxUY5ETeJcibJGVEzopz9VcojFiNCOltgUVpmdnmG52WR5vkEpDBjcMYiJE3LWdpzAAEa80RskA5ZOSerCRg2VIKHY38vsfJOFIyfpv2E3J2ohCytN9tseTrcXuByWmHQJPa7JRmNZIwEVYyhri1Z9EmuFciTM1OeZWlpiuR3hXMT6TRsxLulKd3QYZo1kquzKialMBSFnE1QcdZvj7OHXKYpl+Cuf49WJcSr5MnvKvVxq1rmcq/Bm3GKitUASL6Juifn6FL0HDzB41Q4WlhrMJTGTC4u0c4ZywdHf309OHTabujT9ZSnQH6dojYCIdJCLCdBohVYpx4kL4yz+/Q85eN+d7Hj8S7w9NYFtROzL97I5CKnkakwENS4kRU4vRqy/535ue+wRovkW9dAylUScmpunNNRHwbZxJpf6VqrgVHTmCqBZKFUQzYinNNsGNzdDZWMfZ0V566+ehteO8Ok/+CJ3/ehbzO3dxoloiWA5YkMzod9aeq7dxl1P/ilf/v4TvPCNb9OreeaTmIkk5ny7ydCuQVxbqc/V0a5I2VQEGSjx5tvlHYCgGByNJGDh2Dl23vzLvPL1iJemp+j9/GN85Ku/y/5P3sL1d9zCufHzXB67iDGWvuEBhoaGMAt1/vzOz7Ly+vtsqK1hqr5Io5WwuL6X63f3M79kmDx3FjUBqorFoOnPZyCDiGJ/IaweykqdQEzHea0WKa1M8NHfu5cXnjvG0vxlLi0vE734BuvPTJJvJ/StXcfg1s1s6q3R98E043/zff7xoUeZHh1jz/AWRmemMPkCR2cvceChO7hle8DRuQ28+70fkJiQCEVEwOdxFH/sBOTu4pBm5hqKIcSQRygGeaqLk/z2s5/hjamP8A9f+AqD/YP0ieEqCdlW6WWg0ksYhrSWlpmcnuHI0hxJrYeR6hpevnSeXL7A1NwM4YHdPPbITrRvD9/+zsssfPc5WuUybXXEKFFa/sSqJCgRnYjJaoHYOXY4Kky+9Tp3fvEgJybWMvrOq7hSmQYwvtLg+PwspxZmOdlYZDyAvrVrUYXnJ8ewuYDJuSnc1Vv5nc9fT61Q5nB9Hce/+SRFU2QFX/IooGnEViOXAjNd6ShzYnGQz1sWJnJMn/wJ9//hr3Niosroe2/SwtCyFjEGaw1JYKnjOLI0y9uNOYIkYbwxx8CN+/j9h/eysZbj7eqN/PtX/4zeC3VauQCn2il3FMV1Kh5fMMp9pWHNSpBADBbIYTAi5BCKNkejscC1tyxy76HHeP4/Ip79xndZmZskJCAgQFHatImJgTy1kc386v0HufvWMo1Wif9cGOGVp56m/81RXL7IchKTCCQoMRCrI04r2Rg/pXJfaVitCoHJSh4IMRjxNX5OoGByXF6q079riof/8kEKQ5/g3358jiNvHmNibJqkHVOolRkYWcf+j47wsVuH6LF1jozmePa1Gd79zvfYeuYy+UIPDU2I1BGljUfGq1gdEauNitxTGtYgazTwEfONRwo0LbcLNmC+EbPYc567vjDA7b9yO63cVmobKiQaYqJFSn0W1u1i5mKRF16Z4Pkf/SvLL77MjkUhDHMsd8i+undplCJVYufPHYrcXRzWQISwq+YPwO879uGduGAsEgeMLV1m3a4ZBgcs1gi33VFlaNcepmsP8s5ojqMnRnn9X56n7/g4V2kJF1pazuEU2uKnKlZH7BxqxEcrvZY1JQFZT4dgUj/2yvBqcZI2CSqsJA4rLbbX+rj4fomJcp3BfIzKJhaHPsdTf/0GgW3w8x+/xMjpOTYVqyyLI3IxYHCiqKa6S8mvadXrj9NxFQJFURVUFKfgcD6RIjhVBNdpFLKUsZi02dibZ+zNmNK+8/RtuZ+nn3mXS+MnaM7MMTQ6w2BlDfUk6gzmcJ7w6hWoSEeBWaObBSlBCZyCSUEJkIjPl0kaw6x3ERQj0rm6nESsD0t8cBZWgirvvXeS5YUFysfOsbFQpe5iVPFRSnmTqG9sEzzhE/XjOVYj59J9oKJp/e0LRVFwxheOsTo/nyKp32Q+IyRA3gpxI8+luQgCS9COqTUgCoREE08F/OZBZdFx6bnrANEOpfyxibNuWOmsGySayjhdV0g6L9fOg0km93bAfBvW9K9B6ivkYv9Mdn9M9g7tEDtTXgbEqR8jUU3fDcbp6o2ucyOoCC794gTXAeV56NWRiEPbEJgivX01XH0FY6wH0vVxLvWqxDmuGK/7v26+qRKsTg/E6v0rOxdP/dX2WP2sqgqgWPFTHpqQcrVA0YkHrqsRddlMdDY61zrrFd2rP5ldZGFMKw5cSkjV7q49VaVkEB2S9gcAksSIsYTpV2QRSTqDrn58twpdF8ik62NUlCDGgZo0n6aIACuKamquqeH6qHmh21QABqUgShAGHQvoTGNKadcF1nWikoJNHUE7qz3e44JEFcSbAKqo0LXu4lAVrBowLtWtpi2WB1DFsWlthbW5dSQBKS+7BukSSwIkXUCSK+5ZNdlE/RiQZXp1/ye0XVxQxaW5LIuDJgmlotJTWuG6XbupDW/EaeJ5mD4TdwpAOsedKKp28Y1VAUiqykSVxKlXH26VpNkm3ntEFaMOK0pgFGlEbN1maTfOsvtD17Dv7k8hLqKgYKzBGE8PVUXVddLNqsmmQXAu9TQ60bODtnRIOuQXsuZE0sTtC0e/NJUToaDQEzl624btWyP2/dp15CsB67auZ/Pe+2jMXCL67zcgTrDGYoxFDf+PU35q3ap6UwrEaaTtoC0dWlWdeJNPrSAQoShCrwprVdiohs15y47BCjtvX8vIxwfp3bwTZl+nkDtF3+B2dn7qQaobh8nPLtDTWKa0skLZOQqp7OMrrKN7mZOO/zkccn3Yp6Zr1cYXiOmaq0CPswz0wjX78vStr1BaV6Y8XKNULbK+t0q1vEC5v0pYKUGlB9bsBzZz6p0L/PS/TnP6Z0dZOH+exalZ5MIUy0nCEkoLJdbV7OCyfSoG2RPUdHUpaLX28qWO54UThy04goIhXxR6iiE9pSKVakCpXEHCwFtN1KbdXGK5GTE1FzC9aIjiBNdso802hTjBKKkL+lnyosjyp3cFp4rsToFlS+qBmNXpzFZ/VBAnqAPnXGqwnZohE3tqJ/4Tg7TDVwGsRcQQGyFOE3hG8ti5KyxGU5/7X9pHf8B34KX9AAAAAElFTkSuQmCC";
const FAV_URI  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAI2klEQVR42lWXa4xdVRXHf2vvc+57Zu50pg867fQx00op0AIpLQYoGERtgigi0eAjrSgxRENCYvigodFIookmfFC/GDAGYySpCiSIhofyCLRAWwqlTKdAO1M6pZ12Zu7cmbn3nrP38sM+97bc5OTsc+6967/W/7/W2mvLJltVI4IVsCpEYrAIxggGsGKwQKxCJRcTzy0Q+zkickiUo5m2WKBFkxKuUiBNUlyzRRIJqTU4VVL1pCgO8OpxqkRWAkCEITJChGDEYJDw7JRSbKh25+maqLH+2s1s2fk1li0eQOYaNBbqfHDyKPueeZ7R/cew5TKX33IVI++Nc+zkFC0jKAIKACIGUOwKW9odieFTF4a8MeQS5ZJyjjWr+hie8nz+x/fx5UceJj4wyiuP/ZWD/36BuSMfcP3iNdy06256PtPP+b1vsOHWbcxNTHHm1HlcFOEDNIbsIyDX5frVAhbJgIVYDAVvGCzluPqWzXS9cZqhHTvY+PMfcfj2XTz66n+YMV34OMI7xyVpk++vv4bue77OSOUsT9/3K0ob1jKtnndHx0msxanHA6l6HIpdbUq7rUgHOC+Goomopik7vv05lleGWN3MY394Jz2/f4K//H0P56uLEWvxRijkctTzJU7PT7L1dIIbHKK4dQ0nXj2EK+SYnq6jF2LtfIyVLKHEEIshZy12vsW11w9xyeWbWJfvo5WLaHwwxsT/9nK+XITU4bzHAM578gijcwucihr0/XeE/PJhmv39nBoZJ45zWBEizEWsGowlRBtn2sZiWZITNt18JXGrm95SgXR6lvf37udcvY4RwSAUbURRLDmxxCIk1vLh7BSLy2VmXzvC0G03YVCMWCIR2qxKkBgTSslgRYiNYJrK8Po+ioUuiuSZyRsqU/OMHHyHI6mjVw1FsRTEUJCQhHkTYUTIe0syWyMdm2DN2gEW9fWTS33HfjtIo2AsBgMYJZRP4li5vp+5msc2U84NDVCbmaX31HneWKiT5ApUNaXXxJRNTMXGSNLAt+r0phGnJj9hZmqOUj5m6eAyTOqITdYbsjI1SNA46JzdUSplYVojPn7hNQbuvJUDS0ssbUC1EPGhiTiGw7t5qpJgZs7irGPxqtUs1Ob4eLbGucY8pXLEkr5FGOc6FBvAmtAfTOBcgnZiAhk+oVnJsf+l1ykeHWPbE79htCtHZbLOYMNj0xxH55Qj0zPMLB5g+yO/pKu6hLM+ZXSmxnwloqfbYk2OGJC2xiZELAgmhB4EF/WIsdQnplm0tMyod7x+78/YsKifnW8/Rf8D3yLevI51lw5z+fZtfPahn/DAm08z8fb7uI/OcC42HKnV6N24jAhh6tw0YgxGL7ReUTASog7eiMGqIMWYsXcnuWZNER1cypP7D2Buu5etD93Pd37xIN5C06UUvJKMjvHn+3Zz4vnX6e7pYbxeY6wUcftNq5g8vcAn4yeRfB6LoCJ4DTigRG2xJetlUQwnzgjTB17j2l03s+env2PPRx/y4T0PctnwWvoGV4ARJj8a5813D1NH6V/Uy8l6jbHaHNft3MqlwwP86YkPmD8ziXR1YdSDZnICDiXqdBIRRAS8w5WrPPPr5/jKH1bw5o03cuilF5ldsoJDh9+h+9AhiggNYyhWu5lI5jl+9iTzjYTNO67h7h3refVUmdGn/kVcLNNAEZEL2qIYFezGXM/uiHaBZ1tjpDTqZT7e/zJ3PrCd88kK3tp/kFpjgQVrmLXwiWtycHKCkfokvlDmS9/dxq5vXsYBHeLZRx4nP3qSViGPV0WFcIfOWu4srdQIISeGKOtgVoSSjXDzjsrgGe56+C7OJet49m9vc3zkBPXpeWw+pndJhS03rmPHbevp7S7wl1fmeO3Rf7L8yDhJscS8S3BAgidVpaWehLAfyx2llRpngDHSAY9FKFhLawHq8QRfvH+YbbfeSK3RQ76Sw/gGg2sHkKVXcvCtM/zxsec4++RzrD3fwOcLzGtKkoE5lARPywcHHIp8tbhS46yBxBgiyIBD5DkjxD7HmdoUpXWTrFwbc/mlMdd/41bemvoC+w7P8PI/nqZn//ussmWasSVxnpZ4EvUk3uGAFKWpHqceB0SK4gFVUFEUwQNOQm23vJJKg6W9XdTHuznOaTZfsYx9kzfw+J691EYOsXzfcZZVqsziSJ3LdPTBJoIn7MUQBhGvivEoqnRmI4fivMd7T6o+JIUKc87RXRRmR6FZWc6LLx9j7Ojb9Lw3wZJSDzWf4r0HshlLISWzl4F5DUF6lMhndSUIThWDIij4QHmasWCAeRwxOU6eVha6HLmZBtVEmIt8x2iKBh0zLZ0qnrBWLoBHqXrAIBJ4EBREaJNuMUEHCY6BUJu3dK1aRFxvgg9gTj2pCF4/Dda5VLNJM6wjr4oXxWnYLILmoZOlKKgHCaOLZAYjF1Pt7SVqOpwISSZJMHphrnJZhG2w8Bx+G/n2l1kyGQD12RjabqSaNQDBAeI8uTiioOYCGIrz7UjbLFwM7rM8Cu+iRH0YNzGkWdp5CQlgwyCMou20R4GKVSQX4/m0rm16fZZMYR0Y9cqnqDftRaIXXqZZZrosszvZjYI4lvVYhobXYkr5AJbpl3ZseVpZ5O4ip/Qip0znjxq6SpuitvahHhWM4lJHWT1dldNcvfkKNtx8A+nCFFFkURNkcO2M1nYQWaSZ7oEBsAOmtJtsBwlX0NlImMNsohQTpbvp6Ue4anuVwS3LWbqym9Xbv8f03v20jo1gWkGa4HBoQB1Ns7OTv4gBu9yWdneOFSKIKLFAGcOKgmHjQJ6NK8pcuWUJm+5YzoYdl9LbvUAlPsSijUNs3fkDlvX3k1OI04SCNVjvSF1KCyWVdmMibBiqeDxRgsd2pt1wsmqoJ/WOBKVZTZjo93T3WaqzlsVHxuhaVCKaKqNv/RYf9fFJs8i+xTlOzXYxf7qBmWthfEJDAv3h6BIi9xIil01RdkzNjqhGQvlIqCpc2q5sj0UxmYOaOelooYDBYIkwJkKjCC+gXlGRTgn5Tifz/B/9GPL9z8NIRAAAAABJRU5ErkJggg==";

// ── Imagem do logo e favicon (base64) ────────────────────────────────────────
const FAV_IMG  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAJUUlEQVR42lWXa4xdVRXHf2vvfe5rbuc9TKfttFPoYxBKC+WhCIoVlIchKBGCUT+I4gc0fjDGxETFaEzUqNEENRgfxFcCIfiBV0CFFFpe0hT7lNJC37TTztzOnTv3cc7eyw/7zO34Yefec27uWf/1X/+11v/IRtevBsEIWBWcCBbBSH4QnBGMh6K19DiLqzdwNHEUEFekk3Vo0qFNAV/pISPg2x2y4MkKDg9kqngNZCgBJQTFoziLYACLwRnBEYNaMRiBRAwm9fT3Fumx0D/V5OKPf4jL77qN4b4RpNGm05rjyNQRdrzwEvv+tYOGWtZcsYriYJVXXtxLHQMaAAHAAyIAgrN5xk4EJwZLvLYiFIyh0MpYPTFA1ThW1x1X/v5bTN54PScefoRtv/87M2fOMlSt8sGNm7juC1/hP587wbPf/zmVSonRSy5k1z930SlYPKAiiEYYXgAU+UAyrFboBnVicAgl6yg3Olz9/nWMDA0wtmOaVT/5Jqs3b2DrLZ/hsXf3MG968M6h6lmStvjs2IVM3vFJjt88wfPf+xkH3jzM0usuYefOg0w1W2RAQPEKGYGgip2wlQcWWLAiFMRStpak6bl64wquuGULq6YrVFauYPieW2h/6dv8Zd9OOr0jqDWoMRSTAqG8hP82ptncyDAnAsP3387Rl98gs47azBztLKAaqyCSF0PAWIn1tmJIsCQIiVrGypZr7/4w1eIy1rkepvqKZM9s5+23D9IoldAsIwTFACEo1nvOqeOlmeOsagu1J3czfu897NmxC+/BmfMas7nGnBiMJd6MGhAKzuLm23zgpkmKyQijI6PI7Dxzp86w+/WdtEPAaBRq2TrKYimIwYlgjOVQYxZZUsLsfIfKBSMsWzOJtjKMGByGBbZNLkljFjHgxODEMSiBtdetJz0wS3nVUs41GlSPnGb7f/fzHpYhhJJxlMTEYwxFmyAo1WKFMHUW12wiJ8+w4YYrsVlG0eTBxWDyTjMKxmIwgFGwgPHCBX0JlWWjzOw7RmXdBPtKhqFam/rhY/xHQJ1jMHj6TUJPfkrBMzd/lmW2wtnTp6g1mjSmZxlfO07JJV2WF7RmIYKw+cBxIjgTgVTLipbLHH7rCPbkGapfu5tX3zvOlZUBWiblsC1xgDbi5+mXlGR+mvb8LMPr12CanpONOidm62SScsFwP72lIuL1PO0iWGOwJg7AiEQEIxaTDyBCm2MFw+4f/5bLb9vC6A+/ylszMyybTRlrBzQtsr8R2F+rc9JWuf7BHzE2eSm1TsaRTotDzXkGl1WwRijYBAtIN3tBWJiyiwQhGrBWqNdSilkDmVjKP555npXffZDbv3c/q2+8lm2/+hM9uw4w2UphsI/hazex5d67ef3xp6i9tIuBSpkD584xM1BiYu0Ip9+apdNqYpzFqkcRVANGFc2Zz1HFKWiscrYupEePMnnjBp7Y+iKPPPhHbj14hA3f/DIbHvoRKUrmPaWg+EPHefQ7v2Dno08xOjzCVGueg7VpLr39Wpb3lXlt/0Ha7Xmk2IfzCqqEPJ6ikQFB4nAQwYRAVuznlT+/xA2/28ITvxnn1dpppp58js3bdrD6ogl6x0YJIXDmnaPs2LuPWpayenSUg/Vz1M7VsZsu4q5bJ3h7usK+F7YhxQqEgIgAynnWFScLwshrhIKUhV07PeN/eIjP/+DT/PS+X9MINc40hCWvT9GrkCC0raHc10sta/Ha1FHS+TbV9RN8/d4NZIMX8/TDW+HoSXx1CRJ87DYRBI0xFeRTlXFNEBIxJCIUxJAgVGwRX5/io/evpHjZnTz0g6c4+e5+hkyZwVKFgrM0fcqpxhwzdCgnS7jm5ku59+5J0qF1PPrcO0z96mEKSYU59XiBDEhDXMmZBlINyJ2LALj8M+4EoSxF5uZOsfmuAT785c/y+muBbU+/yckj79Gca2OLCf0jPWy65kJu+sR61qyo8Nwe5fFHt1N65kV6bYU6MZBHSVXJCKSqpAS8amRgIXCC4AAnhgRDIlC0BaZrdZZM1rnzG9ewYs1G5joVij0FjG8yfuEYZullHHqrzsN/287ux55l/O3jVIs9zImSqidVpaOBkIPoaAzuUeSO8rgmIjG45HsBITEm9wdQdA4/L5xunWJs8xwjwwlXbCpy1adu5t9nt/DmgSZbn3oOtr/BmixBikVaIQZpSyALkYUgxOxDiOsYxSmKAiHaAxS61564P5tZhivCytIoZ/YO0Vn7Hldfs5KXp67nr4+8ytyxA1S37mWiPMB8QemE+E+PoiE+HyBojKaiqEJQMIoSNP6YacDn9fIh4EP0cZqbiDntMFxIOLUnEIZW8cyzezj27h5KO99hVWmAugTS4EHB5yLL0JzumFQI2gUSUFzIXUpAQDW2ySL/Rs6KRRGFlvM4X+Tdk542AXeuyVATGkkEG5k7X2Ov2lV9IN5TYvYBcJmGuA3ijCAjgMQphebfNbpIk7tbMMzOW/qHh3CzLYxKdMJ5sCCR/qAas84/vUZD6lkAF3BBlSBKlhfKIAQUQfAAGrCY3EJJnoHitMjA0CCuneFFospVu57Po9GKLwq2mBGfd4ILOVKEfEMpufa69AtKhoAGFEMATOZJEkdJTaRbZVGg3HzComu6wLxGcAHFpRpQov+PGUOQvEYSs0fiphQUo7FPqg60UEBVUVnIOHQDdwHklAci0wsiXNCD8She4p8zFgsnnH+b0dC10YGAJbB8wLFm7UVIpfh/1Kb5MzLVbhcEtNsNASIQwKtiQpeS0AWR5XWM3RFQjVMCo/hWRp94Kj0nuOqKy7n0YzeQNWdw1qBGogBVz59FScXr0GVEBexyU3lAOK+BhdVsFk4GSapUUqW/HRgtCVfdNsrSyWFGx5ew+oYvUt+9n87ePZhOhlPJB5niTV73nNHzgOgyYsds5YEocOm+NFigJMKAGNYMWt63vMz7VlfZeP0Yl925nHUfmaSvPE21sIeB9Su46nP3sfKiVfQ4h/OeioWCCGQZKYFU8pISqV88F1ymARVBNb67kc8oHzwtTclKSm3EUxlUeqtz9J8RhrND9AxWsTNl9NVfEtwAtWaVNwbh8LJe5kyLNG1QCh3axDXsEQJxF3gNUQcKstH1q5Ho0Z2YrmEw+Rz0aRwkC49YsNOwsEUg0CE2aDR2RhxiLcEaQt7VCnnWC++HUV//A36uQClxCnOcAAAAAElFTkSuQmCC";


// ─────────────────────────────────────────────────────────────────────────────
// 🗄️  SUPABASE — cliente ultra-leve (sem SDK, usa REST + fetch)
// Configure na aba "Supabase" do ADM. Até lá, o app usa dados locais.
// ─────────────────────────────────────────────────────────────────────────────
const SUPA_URL = "https://klhcrhlpumyhuwevseif.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaGNyaGxwdW15aHV3ZXZzZWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNzkyMjgsImV4cCI6MjA4ODg1NTIyOH0.-0RZS18bkecEM8FEOhmwswamGYkEdlyUMovGSAY_POk";
const getSupaCfg = () => { try { const s = localStorage.getItem("v9_supa"); return s ? JSON.parse(s) : { url: SUPA_URL, key: SUPA_KEY }; } catch { return { url: SUPA_URL, key: SUPA_KEY }; } };
const saveSupaCfg = (url, key) => { try { localStorage.setItem("v9_supa", JSON.stringify({ url: url.replace(/\/$/, ""), key })); } catch {} };

const supaFetch = async (table, method = "GET", body = null, filter = "", cfg = null) => {
  const c = cfg || getSupaCfg();
  if (!c?.url || !c?.key) return null;
  const url = `${c.url}/rest/v1/${table}${filter ? "?" + filter : ""}`;
  const headers = {
    "Content-Type": "application/json",
    "apikey": c.key,
    "Authorization": `Bearer ${c.key}`,
    "Prefer": "return=representation",
  };
  try {
    const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const text = await res.text();
    if (!res.ok) { console.warn("Supabase error:", res.status, text); return null; }
    if (!text || text === "null") return method === "DELETE" ? true : [];
    return JSON.parse(text);
  } catch (e) {
    if (e.message?.includes("Failed to fetch") || e.message?.includes("CORS") || e.name === "TypeError") {
      return "cors_blocked";
    }
    console.warn("Supabase fetch error:", e);
    return null;
  }
};

// Upload de imagem para o Supabase Storage (bucket "wines")
const supaUploadImage = async (base64, wineId, cfg) => {
  const c = cfg || getSupaCfg();
  if (!c?.url || !c?.key || !base64) return null;
  try {
    // Converte base64 para Blob
    const [meta, data] = base64.split(",");
    const mime = meta.match(/:(.*?);/)?.[1] || "image/jpeg";
    const ext = mime.split("/")[1] || "jpg";
    const bytes = atob(data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: mime });
    const fileName = `wine_${wineId}_${Date.now()}.${ext}`;
    const uploadUrl = `${c.url}/storage/v1/object/wines/${fileName}`;
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { "apikey": c.key, "Authorization": `Bearer ${c.key}`, "Content-Type": mime, "x-upsert": "true" },
      body: blob,
    });
    if (!res.ok) { console.warn("Storage upload error:", res.status, await res.text()); return null; }
    // Retorna URL pública
    return `${c.url}/storage/v1/object/public/wines/${fileName}`;
  } catch (e) {
    console.warn("Storage upload exception:", e);
    return null;
  }
};

// Remove imagem do Supabase Storage
const supaDeleteImage = async (imgUrl, cfg) => {
  const c = cfg || getSupaCfg();
  if (!c?.url || !c?.key || !imgUrl) return;
  try {
    const path = imgUrl.split("/storage/v1/object/public/wines/")[1];
    if (!path) return;
    await fetch(`${c.url}/storage/v1/object/wines/${path}`, {
      method: "DELETE",
      headers: { "apikey": c.key, "Authorization": `Bearer ${c.key}` },
    });
  } catch {}
};

// Helpers por tabela
const supa = {
  wines:     { list: (c) => supaFetch("wines", "GET", null, "order=name", c),
               insert: (w, c) => supaFetch("wines", "POST", w, "", c),
               update: (w, c) => supaFetch("wines", "PATCH", w, `id=eq.${w.id}`, c),
               delete: (id, c) => supaFetch("wines", "DELETE", null, `id=eq.${id}`, c) },
  orders:    { list: (c) => supaFetch("orders", "GET", null, "order=created_at.desc", c),
               insert: (o, c) => supaFetch("orders", "POST", o, "", c),
               update: (o, c) => supaFetch("orders", "PATCH", o, `id=eq.${o.id}`, c) },
  customers: { list: (c) => supaFetch("customers", "GET", null, "order=name", c),
               insert: (cu, c) => supaFetch("customers", "POST", cu, "", c) },
  reviews:   { list: (c) => supaFetch("reviews", "GET", null, "order=created_at.desc", c),
               insert: (r, c) => supaFetch("reviews", "POST", r, "", c),
               update: (r, c) => supaFetch("reviews", "PATCH", r, `id=eq.${r.id}`, c),
               delete: (id, c) => supaFetch("reviews", "DELETE", null, `id=eq.${id}`, c) },
};

const INITIAL_WINES = [
  { id: 801, name: "Vinho Olaria Suave", origin: "Portugal", region: "Lisboa", year: "", costPrice: 18.00, price: 36.90, promoPrice: null, stock: 30, category: "Tinto", alcohol: "12.5%", grapes: "Blend português", description: "Vinho português suave e fácil de beber, ideal para o dia a dia. Notas leves de frutas vermelhas e taninos suaves.", keywords: "olaria suave, vinho portugues barato, vinho tinto portugal", harmonization: "Massas, Carnes leves, Petiscos", rating: 4.2, sales: 0, img: null },
  { id: 802, name: "Casillero del Diablo Chardonnay", origin: "Chile", region: "Valle Central", year: "2020", costPrice: 35.00, price: 69.90, promoPrice: null, stock: 20, category: "Branco", alcohol: "13.0%", grapes: "Chardonnay", description: "Chardonnay chileno equilibrado com notas frutadas e toque amanteigado. Fresco e elegante, ideal para frutos do mar.", keywords: "casillero del diablo chardonnay, vinho branco chile", harmonization: "Peixes, Frutos do mar, Saladas", rating: 4.5, sales: 0, img: null },
  { id: 803, name: "Herencia Cabernet Sauvignon", origin: "Chile", region: "Valle Central", year: "2024", costPrice: 28.00, price: 56.90, promoPrice: 44.90, stock: 25, category: "Tinto", alcohol: "13.5%", grapes: "Cabernet Sauvignon", description: "Cabernet chileno encorpado com notas de frutas vermelhas maduras. Estrutura firme e acabamento longo e elegante.", keywords: "herencia cabernet sauvignon, vinho chileno cabernet", harmonization: "Carnes vermelhas, Churrasco, Massas", rating: 4.4, sales: 0, img: null },
  { id: 804, name: "Santa Carolina Reservado Cab. Merlot", origin: "Chile", region: "Valle Central", year: "", costPrice: 29.00, price: 58.90, promoPrice: null, stock: 22, category: "Tinto", alcohol: "13.5%", grapes: "Cabernet Sauvignon, Merlot", description: "Blend chileno equilibrado com boa estrutura e notas de frutas maduras. Taninos sedosos e final persistente.", keywords: "santa carolina reservado, cabernet merlot chile", harmonization: "Carnes vermelhas, Massas, Churrasco", rating: 4.4, sales: 0, img: null },
  { id: 805, name: "Santa Carolina Reservado Carmenere", origin: "Chile", region: "Valle Central", year: "2023", costPrice: 29.00, price: 58.90, promoPrice: 49.90, stock: 22, category: "Tinto", alcohol: "13.5%", grapes: "Carmenere", description: "Carmenere chileno macio com notas de frutas negras e especiarias. O emblema do Chile com toques de pimentão e café.", keywords: "santa carolina carmenere, vinho carmenere chile", harmonization: "Carnes vermelhas, Massas, Queijos", rating: 4.5, sales: 0, img: null },
];

const SALES_DATA = [
  { month: "Jan", revenue: 0, cost: 0, orders: 0 },
  { month: "Fev", revenue: 0, cost: 0, orders: 0 },
  { month: "Mar", revenue: 0, cost: 0, orders: 0 },
  { month: "Abr", revenue: 0, cost: 0, orders: 0 },
  { month: "Mai", revenue: 0, cost: 0, orders: 0 },
  { month: "Jun", revenue: 0, cost: 0, orders: 0 },
];

const INITIAL_ORDERS = [];

const INITIAL_REVIEWS = [];

const INITIAL_BANNERS = [
  { id: 1, title: "Vinhos Importados", titleAccent: "de Excelência", subtitle: "Curadoria especial das melhores regiões vinícolas do mundo.", cta: "Explorar Catálogo", tag: "Coleção Exclusiva", accent: "#e8b4b4", bg: "linear-gradient(135deg,#1a0505 0%,#2d0f0f 40%,#1a0a05 100%)", overlay: "rgba(0,0,0,0.35)", imgDesktop: null, imgMobile: null, heightDesktop: 420, heightMobile: 280, contentAlign: "center", textAlign: "center", imgSize: "cover", imgPosition: "center", active: true },
  { id: 2, title: "Semana do Champagne", titleAccent: "", subtitle: "Espumantes franceses com até 20% OFF — aproveite enquanto durar.", cta: "Ver Ofertas", tag: "Promoção", accent: "#fbbf24", bg: "linear-gradient(135deg,#1a1000 0%,#2a1500 50%,#1a0a00 100%)", overlay: "rgba(0,0,0,0.4)", imgDesktop: null, imgMobile: null, heightDesktop: 420, heightMobile: 280, contentAlign: "center", textAlign: "center", imgSize: "cover", imgPosition: "center", active: true },
  { id: 3, title: "Novos Rótulos Italianos", titleAccent: "", subtitle: "Super Toscanos e Barolo recém chegados. Descubra sabores únicos.", cta: "Descobrir", tag: "Novidade", accent: "#60a5fa", bg: "linear-gradient(135deg,#0a1520 0%,#0f1f35 50%,#0a1020 100%)", overlay: "rgba(0,0,0,0.4)", imgDesktop: null, imgMobile: null, heightDesktop: 420, heightMobile: 280, contentAlign: "center", textAlign: "center", imgSize: "cover", imgPosition: "center", active: false },
  { id: 4, title: "Clube Vinhos9", titleAccent: "", subtitle: "Assine e receba 3 rótulos exclusivos por mês na sua porta.", cta: "Quero Assinar", tag: "Clube", accent: "#c084fc", bg: "linear-gradient(135deg,#1a0a1a 0%,#2a1035 50%,#150a15 100%)", overlay: "rgba(0,0,0,0.4)", imgDesktop: null, imgMobile: null, heightDesktop: 420, heightMobile: 280, contentAlign: "center", textAlign: "center", imgSize: "cover", imgPosition: "center", active: false },
];

const INITIAL_HIGHLIGHT_WINES = [1, 2, 4, 5, 6];

const INITIAL_HERO_BANNER = {
  tag: "Coleção Exclusiva",
  title: "Vinhos Importados",
  titleAccent: "de Excelência",
  subtitle: "Curadoria especial das melhores regiões vinícolas do mundo.",
  ctaLabel: "Explorar Catálogo",
  imgDesktop: null, // imagem de fundo desktop (recomendado 1920×600px)
  imgMobile: null,  // imagem de fundo mobile (recomendado 768×500px)
};

const MOCK_CLIENT = {
  name: "Ana Souza",
  email: "ana.souza@email.com",
  phone: "(11) 99999-0000",
  since: "Janeiro 2025",
  tier: "Gold",
  points: 2840,
  orders: [
    { id: "#0038", date: "15/01/2026", wines: ["Château Margaux × 1", "Veuve Clicquot × 1"], total: 1300, status: "Entregue" },
    { id: "#0041", date: "08/03/2026", wines: ["Château Margaux × 2"], total: 1780, status: "Entregue" },
    { id: "#0046", date: "11/03/2026", wines: ["Cloudy Bay Sauvignon × 2", "Kim Crawford Rosé × 1"], total: 477, status: "Em trânsito" },
  ],
  wishlist: [2, 4, 6], // wine IDs
  savedCoupons: ["VINO10", "BEMVINDO"],
};

const CATEGORIES = ["Todos", "Tinto", "Branco", "Espumante", "Rosé"];

const HARMONIZATION = {
  Tinto: ["🥩 Carnes vermelhas", "🧀 Queijos curados", "🍄 Cogumelos", "🫙 Embutidos"],
  Branco: ["🐟 Peixes e frutos do mar", "🐔 Aves grelhadas", "🧀 Queijos frescos", "🥗 Saladas"],
  Espumante: ["🦞 Lagosta e camarão", "🎂 Sobremesas leves", "🧀 Queijo brie", "🥂 Petiscos"],
  Rosé: ["🍓 Frutas vermelhas", "🐷 Porco", "🥗 Salada Niçoise", "🍕 Pizza napolitana"],
};

const PAYMENT_GATEWAYS = {
  mercadopago: { name: "Mercado Pago", icon: "💳", fields: ["publicKey","accessToken"] },
  pagseguro:   { name: "PagSeguro",   icon: "🔒", fields: ["email","token"] },
  stripe:      { name: "Stripe",      icon: "⚡", fields: ["publishableKey","secretKey"] },
  pagarme:     { name: "Pagar.me",    icon: "💰", fields: ["apiKey","cryptoKey"] },
  cielo:       { name: "Cielo",       icon: "🏦", fields: ["merchantId","merchantKey"] },
  asaas:       { name: "Asaas",       icon: "🟢", fields: ["apiKey"] },
};

// 🔐 Hash simples (djb2) — nunca armazena senha em texto puro
const hashStr = (s) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i); return (h >>> 0).toString(36); };
// Credenciais padrão: admin / vinhos9adm  — troque pela aba "Segurança" no ADM
const DEFAULT_ADM_HASH = { user: hashStr("admin"), pass: hashStr("vinhos9adm") };
const getAdmHash = () => { try { const s = localStorage.getItem("v9_adm"); return s ? JSON.parse(s) : DEFAULT_ADM_HASH; } catch { return DEFAULT_ADM_HASH; } };
const saveAdmHash = (user, pass) => { try { localStorage.setItem("v9_adm", JSON.stringify({ user: hashStr(user), pass: hashStr(pass) })); } catch {} };

// 🔐 Rate limiter simples para login ADM
const loginAttempts = { count: 0, lockedUntil: 0 };
const checkRateLimit = () => {
  if (Date.now() < loginAttempts.lockedUntil) {
    const secs = Math.ceil((loginAttempts.lockedUntil - Date.now()) / 1000);
    return `Muitas tentativas. Aguarde ${secs}s.`;
  }
  return null;
};
const registerFailedAttempt = () => {
  loginAttempts.count += 1;
  if (loginAttempts.count >= 5) { loginAttempts.lockedUntil = Date.now() + 60000; loginAttempts.count = 0; }
};

const fmt = (n) => Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const discountPct = (orig, promo) => Math.round(((orig - promo) / orig) * 100);
const margin = (cost, sale) => sale > 0 && cost >= 0 ? (((sale - cost) / sale) * 100).toFixed(1) : "0.0";
const profit = (cost, sale) => Math.max(0, sale - cost);

const Stars = ({ rating }) => (
  <span style={{ color: "#f59e0b", fontSize: 12 }}>
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    <span style={{ color: "#a09080", fontSize: 10, marginLeft: 4 }}>{rating}</span>
  </span>
);

const MarginBadge = ({ pct }) => {
  const p = parseFloat(pct);
  const color = p >= 35 ? "#4ade80" : p >= 20 ? "#fbbf24" : "#f87171";
  const bg = p >= 35 ? "#1a3a1a" : p >= 20 ? "#2a2510" : "#3a1010";
  return <span style={{ background: bg, color, padding: "2px 8px", borderRadius: 10, fontSize: 10 }}>{pct}%</span>;
};

const LowStockBadge = ({ stock }) => {
  if (stock > 3) return null;
  if (stock === 0) return <span style={{ background: "#1a0a0a", color: "#f87171", border: "1px solid #7f1d1d", padding: "2px 7px", borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>ESGOTADO</span>;
  return <span style={{ background: "#2a1505", color: "#fb923c", border: "1px solid #7c2d12", padding: "2px 7px", borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>🔥 Últimas {stock} un.</span>;
};

// Garrafa genérica SVG 1:1
const BottlePlaceholder = ({ size = 80, name = "" }) => (
  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#2a1010,#1a0808)" }}>
    <svg width={size * 0.45} height={size * 0.85} viewBox="0 0 44 100" fill="none">
      <rect x="16" y="0" width="12" height="8" rx="2" fill="#5a3a3a" />
      <rect x="14" y="8" width="16" height="6" rx="1" fill="#6b4040" />
      <path d="M12 14 C8 22 6 30 6 42 L6 88 C6 94 10 98 22 98 C34 98 38 94 38 88 L38 42 C38 30 36 22 32 14 Z" fill="#2d1515" />
      <path d="M12 14 C8 22 6 30 6 42 L6 88 C6 94 10 98 22 98 C34 98 38 94 38 88 L38 42 C38 30 36 22 32 14 Z" fill="url(#bg2)" />
      <rect x="10" y="50" width="24" height="24" rx="2" fill="rgba(245,240,232,0.07)" />
      <text x="22" y="59" textAnchor="middle" fill="rgba(245,240,232,0.45)" fontSize="4" fontFamily="Georgia,serif">VINHOS9</text>
      <text x="22" y="67" textAnchor="middle" fill="rgba(245,240,232,0.3)" fontSize="3" fontFamily="Georgia,serif">{name.slice(0, 12)}</text>
      <defs>
        <linearGradient id="bg2" x1="6" y1="14" x2="38" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b2c2c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1a0505" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// ── PromoTimer — countdown de urgência ───────────────────────────────────────
const usePromoTimer = (wineId) => {
  const KEY = `v9_promo_end_${wineId}`;
  const getEnd = () => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) return Number(s);
    } catch {}
    // Gera prazo aleatório entre 4h e 23h a partir de agora
    const end = Date.now() + (Math.floor(Math.random() * 19) + 4) * 3600000;
    try { localStorage.setItem(KEY, String(end)); } catch {}
    return end;
  };
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, getEnd() - Date.now()));
  useEffect(() => {
    const iv = setInterval(() => {
      const left = Math.max(0, getEnd() - Date.now());
      setTimeLeft(left);
      if (left === 0) { try { localStorage.removeItem(KEY); } catch {} clearInterval(iv); }
    }, 1000);
    return () => clearInterval(iv);
  }, [wineId]);
  const h = Math.floor(timeLeft / 3600000);
  const m = Math.floor((timeLeft % 3600000) / 60000);
  const s = Math.floor((timeLeft % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return { h, m, s, pad, expired: timeLeft === 0 };
};

const PromoTimer = ({ wineId, compact = false }) => {
  const { h, m, s, pad, expired } = usePromoTimer(wineId);
  if (expired) return null;
  if (compact) return (
    <div style={{ background: "rgba(180,83,9,.12)", border: "1px solid rgba(180,83,9,.35)", borderRadius: 4, padding: "4px 7px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        <span style={{ fontSize: 9, color: "#fb923c" }}>⏰</span>
        <span style={{ fontSize: 10, color: "#fbbf24", fontWeight: "bold", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{pad(h)}:{pad(m)}:{pad(s)}</span>
        <span style={{ fontSize: 9, color: "#ef4444", fontWeight: "bold", letterSpacing: .3, whiteSpace: "nowrap" }}>⚠️ Oferta limitada!</span>
      </div>
    </div>
  );
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,rgba(180,83,9,.2),rgba(120,50,0,.15))", border: "1px solid rgba(180,83,9,.4)", borderRadius: 8, padding: "8px 14px" }}>
      <span style={{ fontSize: 14 }}>⏰</span>
      <div>
        <div style={{ fontSize: 9, color: "#b45309", letterSpacing: 2, textTransform: "uppercase", marginBottom: 1 }}>Oferta expira em</div>
        <div style={{ fontSize: 18, color: "#fbbf24", fontWeight: "bold", fontVariantNumeric: "tabular-nums", letterSpacing: 2 }}>
          {pad(h)}<span style={{ color: "#b45309", fontSize: 12 }}>h</span> {pad(m)}<span style={{ color: "#b45309", fontSize: 12 }}>m</span> {pad(s)}<span style={{ color: "#b45309", fontSize: 12 }}>s</span>
        </div>
      </div>
    </div>
  );
};

// ── BannersAdminPanel — painel ADM de 4 banners com imagem ───────────────────
const BannersAdminPanel = ({ banners, saveBanners }) => {
  const [editIdx, setEditIdx] = useState(0);
  const eb = banners[editIdx] || banners[0];
  const updateBanner = (field, val) => {
    saveBanners(banners.map((b, i) => i === editIdx ? { ...b, [field]: val } : b));
  };
  const uploadImg = (field, file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = ev => updateBanner(field, ev.target.result);
    r.readAsDataURL(file);
  };
  if (!eb) return null;
  const previewBg = eb.imgDesktop
    ? { backgroundImage: `url(${eb.imgDesktop})`, backgroundSize: eb.imgSize || "cover", backgroundPosition: eb.imgPosition || "center" }
    : { background: eb.bg || "linear-gradient(135deg,#1a0505,#2d0f0f)" };
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div>
      <div style={{ marginBottom: 6 }}>
        <h1 style={{ fontSize: 21, marginBottom: 3 }}>🎨 Carrossel de Banners</h1>
        <p style={{ color: "#7a6a6a", fontSize: 11 }}>4 banners com imagem desktop e mobile — aparecem em rotação automática na home.</p>
      </div>

      {/* Seleção do banner */}
      <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
        {banners.map((b, i) => (
          <button key={b.id} onClick={() => setEditIdx(i)}
            style={{ padding: "8px 18px", borderRadius: 6, border: `2px solid ${editIdx === i ? "#8b2c2c" : "#2a1f1f"}`, background: editIdx === i ? "rgba(139,44,44,.2)" : "#1a1410", color: editIdx === i ? "#e8b4b4" : "#7a6a6a", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: b.active !== false ? "#4ade80" : "#5a4a4a", display: "inline-block" }} />
            Banner {i + 1}
          </button>
        ))}
      </div>

      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 12, padding: 22, marginBottom: 22 }}>
        {/* Preview */}
        <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", marginBottom: 18, height: 160, ...previewBg }}>
          <div style={{ position: "absolute", inset: 0, background: eb.overlay || "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 20px" }}>
            {eb.tag && <div style={{ fontSize: 8, letterSpacing: 3, color: eb.accent || "#e8b4b4", textTransform: "uppercase", border: `1px solid ${eb.accent || "#e8b4b4"}40`, padding: "2px 10px", borderRadius: 3, marginBottom: 8 }}>{eb.tag}</div>}
            <div style={{ fontSize: 20, color: "#f5f0e8", fontWeight: "bold", lineHeight: 1.2, marginBottom: 6 }}>{eb.title || "Título do Banner"}{eb.titleAccent && <><br /><span style={{ color: eb.accent || "#e8b4b4" }}>{eb.titleAccent}</span></>}</div>
            {eb.subtitle && <div style={{ fontSize: 11, color: "rgba(245,240,232,.75)", marginBottom: 10, maxWidth: 400 }}>{eb.subtitle}</div>}
            {eb.cta && <span style={{ background: eb.accent || "#8b2c2c", color: "#fff", fontSize: 9, padding: "5px 14px", borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>{eb.cta}</span>}
          </div>
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <span style={{ fontSize: 9, padding: "2px 8px", background: eb.active !== false ? "rgba(74,222,128,.2)" : "rgba(90,74,74,.4)", color: eb.active !== false ? "#4ade80" : "#5a4a4a", border: `1px solid ${eb.active !== false ? "#4ade80" : "#3a2f2f"}`, borderRadius: 10 }}>
              {eb.active !== false ? "● Ativo" : "○ Inativo"}
            </span>
          </div>
        </div>

        {/* Toggle */}
        <div style={{ marginBottom: 18 }}>
          <button onClick={() => updateBanner("active", eb.active === false ? true : false)}
            style={{ padding: "7px 16px", background: eb.active !== false ? "rgba(74,222,128,.1)" : "#1a1410", border: `1px solid ${eb.active !== false ? "#4ade80" : "#2a1f1f"}`, borderRadius: 4, color: eb.active !== false ? "#4ade80" : "#5a4a4a", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
            {eb.active !== false ? "✓ Ativo na home" : "○ Inativo — clique para ativar"}
          </button>
        </div>

        {/* Textos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[["tag","Etiqueta","Coleção Exclusiva",false],["cta","Botão CTA","Explorar Catálogo",false],["title","Título linha 1 (branco)","Vinhos Importados",true],["titleAccent","Título linha 2 (colorido)","de Excelência",true],["subtitle","Subtítulo","Curadoria especial...",true]].map(([field,label,ph,full]) => (
            <div key={field} style={full ? { gridColumn: "1/-1" } : {}}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 4 }}>{label}</label>
              <input value={eb[field] || ""} onChange={e => updateBanner(field, e.target.value)} placeholder={ph}
                style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "8px 10px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>

        {/* Cor + tamanhos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 4 }}>Cor de destaque</label>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input type="color" value={eb.accent || "#e8b4b4"} onChange={e => updateBanner("accent", e.target.value)}
                style={{ width: 40, height: 36, borderRadius: 4, border: "1px solid #2a1f1f", cursor: "pointer", padding: 2 }} />
              <span style={{ fontSize: 11, color: "#a09080" }}>{eb.accent || "#e8b4b4"}</span>
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 4 }}>Altura Desktop (px)</label>
            <input type="number" value={eb.heightDesktop || 420} onChange={e => updateBanner("heightDesktop", Number(e.target.value))}
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "8px 10px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 4 }}>Altura Mobile (px)</label>
            <input type="number" value={eb.heightMobile || 280} onChange={e => updateBanner("heightMobile", Number(e.target.value))}
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "8px 10px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif" }} />
          </div>
        </div>

        {/* Imagens */}
        <div style={{ borderTop: "1px solid #2a1f1f", paddingTop: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#8b6060", textTransform: "uppercase", marginBottom: 12 }}>🖼 Imagens de Fundo</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Desktop","🖥","imgDesktop","1920×600px"],["Mobile","📱","imgMobile","768×500px"]].map(([lbl,ico,field,rec]) => {
              const inputId = `bannerImg_${editIdx}_${field}`;
              return (
                <div key={field} style={{ background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 4 }}>{ico} {lbl}</div>
                  <div style={{ fontSize: 9, color: "#3a2a2a", marginBottom: 8 }}>Rec: {rec} · JPG/WebP/PNG</div>
                  {eb[field] ? (
                    <div style={{ position: "relative", marginBottom: 8 }}>
                      <img src={eb[field]} alt={lbl} style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 4 }} />
                      <button onClick={() => updateBanner(field, null)}
                        style={{ position: "absolute", top: 3, right: 3, background: "rgba(0,0,0,.75)", border: "none", color: "#ef4444", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 11 }}>✕</button>
                    </div>
                  ) : (
                    <div style={{ height: 60, background: "#1a1410", border: "1px dashed #2a1f1f", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#3a2a2a", marginBottom: 8 }}>
                      {field === "imgMobile" ? "sem imagem — usa desktop" : "sem imagem — usa gradiente"}
                    </div>
                  )}
                  <input type="file" accept="image/*" id={inputId} style={{ display: "none" }}
                    onChange={e => { uploadImg(field, e.target.files[0]); e.target.value = ""; }} />
                  <button onClick={() => document.getElementById(inputId).click()}
                    style={{ width: "100%", padding: "7px", background: "#1a1410", border: "1px solid #3a2f2f", color: "#e8b4b4", borderRadius: 4, cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif" }}>
                    📷 Enviar {lbl}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Posicionamento — só aparece se tiver imagem */}
        {(eb.imgDesktop || eb.imgMobile) && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 4 }}>Tamanho da imagem</label>
              <select value={eb.imgSize || "cover"} onChange={e => updateBanner("imgSize", e.target.value)}
                style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "8px 10px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif" }}>
                <option value="cover">Cover (preenche todo)</option>
                <option value="contain">Contain (mostra tudo)</option>
                <option value="100% 100%">Esticado</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 4 }}>Posição da imagem</label>
              <select value={eb.imgPosition || "center"} onChange={e => updateBanner("imgPosition", e.target.value)}
                style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "8px 10px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif" }}>
                <option value="center">Centro</option>
                <option value="top">Topo</option>
                <option value="bottom">Baixo</option>
                <option value="left">Esquerda</option>
                <option value="right">Direita</option>
              </select>
            </div>
          </div>
        )}

        <div style={{ padding: "10px 14px", background: "rgba(139,44,44,.06)", border: "1px solid rgba(139,44,44,.15)", borderRadius: 6, fontSize: 11, color: "#8b6060" }}>
          💡 As alterações são salvas automaticamente. Os banners ativos aparecem na home em rotação de 5 segundos.
        </div>
      </div>
    </div>
  );
};

// ── ManualReviewForm — ADM: adicionar avaliação manual ────────────────────────
const ManualReviewForm = ({ wines, supaCfg, setReviews, showToast }) => {
  const [form, setForm] = useState({ wineId: "", author: "", rating: 5, comment: "" });
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!form.wineId || !form.author.trim() || !form.comment.trim()) {
      showToast("Preencha todos os campos.", "error"); return;
    }
    setSaving(true);
    const newReview = {
      id: Date.now(),
      wineId: Number(form.wineId),
      wine_id: Number(form.wineId),
      author: form.author.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      date: new Date().toLocaleDateString("pt-BR"),
      approved: true,
    };
    if (supaCfg) {
      const r = await supaFetch("reviews", "POST", {
        wine_id: newReview.wineId, author: newReview.author,
        rating: newReview.rating, comment: newReview.comment,
        date: newReview.date, approved: true,
      }, null, supaCfg);
      if (r?.[0]) newReview.id = r[0].id;
    }
    setReviews(prev => [newReview, ...prev]);
    setForm({ wineId: "", author: "", rating: 5, comment: "" });
    showToast("✅ Avaliação adicionada e publicada!");
    setSaving(false);
  };
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 12, padding: 22, marginBottom: 28 }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 16 }}>✍️ Adicionar Avaliação Manualmente</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Vinho</label>
          <select value={form.wineId} onChange={e => setForm(p => ({ ...p, wineId: e.target.value }))}
            style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 10px", color: form.wineId ? "#f5f0e8" : "#5a4a4a", fontSize: 12, fontFamily: "Georgia,serif" }}>
            <option value="">Selecione o vinho…</option>
            {wines.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Nome do Cliente</label>
          <input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))}
            placeholder="Ex: João Silva"
            style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 10px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif", boxSizing: "border-box" }} />
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 8 }}>Nota</label>
        <div style={{ display: "flex", gap: 8 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setForm(p => ({ ...p, rating: n }))}
              style={{ width: 36, height: 36, borderRadius: 6, border: `1px solid ${form.rating >= n ? "#f59e0b" : "#2a1f1f"}`, background: form.rating >= n ? "rgba(245,158,11,.15)" : "#120e0c", color: form.rating >= n ? "#f59e0b" : "#5a4a4a", fontSize: 16, cursor: "pointer" }}>★</button>
          ))}
          <span style={{ fontSize: 13, color: "#a09080", marginLeft: 6, alignSelf: "center" }}>{form.rating}/5</span>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Comentário</label>
        <textarea value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
          placeholder="Escreva o comentário do cliente…" rows={3}
          style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 10px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif", resize: "vertical", boxSizing: "border-box" }} />
      </div>
      <button onClick={submit} disabled={saving}
        style={{ padding: "10px 22px", background: saving ? "#2a1f1f" : "#8b2c2c", border: "none", borderRadius: 4, color: saving ? "#5a4a4a" : "#fff", cursor: saving ? "not-allowed" : "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1 }}>
        {saving ? "Salvando…" : "✅ Publicar Avaliação"}
      </button>
    </div>
  );
};

// ── SommelierWidget — componente isolado (fix Rules of Hooks) ─────────────────
const SommelierWidget = ({ wine }) => {
  const [somMsg, setSomMsg] = useState("");
  const [somLoad, setSomLoad] = useState(false);
  const [somOpen, setSomOpen] = useState(false);
  const [somHistory, setSomHistory] = useState([]);

  const askSommelier = async () => {
    if (!somMsg.trim() || somLoad) return;
    const userMsg = somMsg.trim();
    setSomMsg("");
    setSomLoad(true);
    const newHistory = [...somHistory, { role: "user", content: userMsg }];
    setSomHistory(newHistory);
    try {
      const system = `Você é um sommelier especialista da loja Vinhos9. Responda sempre em português brasileiro, de forma simpática, elegante e objetiva (máximo 3 frases). 
Vinho atual em análise:
- Nome: ${wine.name}
- Tipo: ${wine.category}
- Origem: ${wine.origin} ${wine.region ? `— ${wine.region}` : ""}
- Uvas: ${wine.grapes || "não informado"}
- Safra: ${wine.year || "não informada"}
- Teor alcoólico: ${wine.alcohol || "não informado"}
- Descrição: ${wine.description || ""}
- Preço: R$ ${wine.promoPrice || wine.price}
Responda dúvidas sobre harmonização, temperatura de serviço, decantação, ocasiões ideais e características do vinho.`;
      const messages = [
        { role: "system", content: system },
        ...newHistory.map(m => ({ role: m.role, content: m.content }))
      ];
      const res = await fetch(`https://withered-rice-255b.suavidadewil.workers.dev`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, max_tokens: 300, system })
      });
      const rawText = await res.text();
      let data;
      try { data = JSON.parse(rawText); } catch { data = { error: { message: `Resposta inválida (${res.status}): ${rawText.slice(0,100)}` } }; }
      if (data.error) {
        setSomHistory([...newHistory, { role: "assistant", content: `⚠️ Erro da API: ${data.error.message}` }]);
        setSomLoad(false); return;
      }
      const reply = data.choices?.[0]?.message?.content?.trim() || "Desculpe, não consegui responder agora.";
      setSomHistory([...newHistory, { role: "assistant", content: reply }]);
    } catch(e) {
      setSomHistory([...newHistory, { role: "assistant", content: `Erro: ${e.message}` }]);
    }
    setSomLoad(false);
  };

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ marginTop: 16, background: "linear-gradient(135deg,#1a0e0e,#120c0c)", border: "1px solid #3a1f1f", borderRadius: 10, overflow: "hidden" }}>
      <button onClick={() => setSomOpen(p => !p)}
        style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#e8b4b4", fontFamily: "Georgia,serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🍷</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: "bold", letterSpacing: 1 }}>Sommelier Virtual</div>
            <div style={{ fontSize: 11, color: "#8b6060" }}>Tire dúvidas sobre este vinho com IA</div>
          </div>
        </div>
        <span style={{ fontSize: 12, color: "#5a4a4a", transform: somOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
      </button>
      {somOpen && (
        <div style={{ borderTop: "1px solid #2a1f1f", padding: "14px 16px" }}>
          {somHistory.length === 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#5a4a4a", marginBottom: 8 }}>Perguntas frequentes:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  "Com o que harmoniza?",
                  "Qual temperatura servir?",
                  "Precisa decantar?",
                  "Para qual ocasião?",
                  "É encorpado ou leve?",
                  "Qual o sabor predominante?",
                  "Serve para presente?",
                  "Vale o preço?",
                  "Combina com churrasco?",
                  "É bom para iniciantes?",
                  "Qual taça usar?",
                  "Pode guardar por quanto tempo?",
                ].map(q => (
                  <button key={q} onClick={() => { setSomMsg(q); setTimeout(() => document.getElementById("som-send-btn")?.click(), 50); }}
                    style={{ padding: "5px 10px", background: "rgba(139,44,44,.1)", border: "1px solid #2a1f1f", borderRadius: 14, color: "#a09080", fontSize: 11, cursor: "pointer", fontFamily: "Georgia,serif" }}>{q}</button>
                ))}
              </div>
            </div>
          )}
          {somHistory.length > 0 && (
            <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {somHistory.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "8px 12px", borderRadius: m.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px", background: m.role === "user" ? "#8b2c2c" : "#1e1614", border: m.role === "assistant" ? "1px solid #2a1f1f" : "none", fontSize: 13, color: m.role === "user" ? "#fff" : "#d0c8c0", lineHeight: 1.6 }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {somLoad && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ padding: "8px 14px", background: "#1e1614", border: "1px solid #2a1f1f", borderRadius: "10px 10px 10px 2px", fontSize: 13, color: "#5a4a4a" }}>🍷 Pensando…</div>
                </div>
              )}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <input value={somMsg} onChange={e => setSomMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && askSommelier()}
              placeholder="Pergunte ao sommelier..."
              style={{ flex: 1, background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 6, padding: "9px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", outline: "none" }} />
            <button id="som-send-btn" onClick={askSommelier} disabled={somLoad || !somMsg.trim()}
              style={{ padding: "9px 14px", background: somLoad || !somMsg.trim() ? "#1a1410" : "#8b2c2c", border: "none", borderRadius: 6, color: somLoad || !somMsg.trim() ? "#4a3a3a" : "#fff", cursor: somLoad || !somMsg.trim() ? "not-allowed" : "pointer", fontSize: 16, transition: "all .2s" }}>➤</button>
          </div>
          {somHistory.length > 0 && (
            <button onClick={() => setSomHistory([])} style={{ marginTop: 8, background: "none", border: "none", color: "#4a3a3a", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>↺ Nova conversa</button>
          )}
        </div>
      )}
    </div>
  );
};

// Thumb quadrado 1024x1024 display
// ── Popup de Boas-vindas ──────────────────────────────────────────────────────
const WelcomePopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const handleSubmit = () => {
    if (!email.includes("@")) return;
    try { localStorage.setItem("v9_popup_email", email); localStorage.setItem("v9_popup_shown", "1"); } catch {}
    setDone(true);
    setTimeout(onClose, 3000);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn .3s ease" }}>
      <div style={{ background: "linear-gradient(145deg,#1a0a0a,#120808)", border: "1px solid #3a1f1f", borderRadius: 16, padding: "36px 32px", maxWidth: 420, width: "100%", position: "relative", textAlign: "center" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 20 }}>✕</button>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🍷</div>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 8 }}>Oferta exclusiva</div>
        <h2 style={{ fontSize: 22, color: "#f5f0e8", marginBottom: 10, lineHeight: 1.3 }}>5% OFF na<br /><span style={{ color: "#e8b4b4" }}>sua primeira compra</span></h2>
        <p style={{ fontSize: 13, color: "#7a6a6a", marginBottom: 24, lineHeight: 1.7 }}>Cadastre seu e-mail e receba o cupom <strong style={{ color: "#fbbf24" }}>BEMVINDO</strong> na hora.</p>
        {!done ? (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="seu@email.com"
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 6, padding: "12px 14px", color: "#f5f0e8", fontSize: 14, fontFamily: "Georgia,serif", marginBottom: 12, boxSizing: "border-box" }} />
            <button onClick={handleSubmit}
              style={{ width: "100%", padding: "13px", background: "#8b2c2c", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "Georgia,serif", letterSpacing: 2, textTransform: "uppercase" }}>
              Quero meu desconto →
            </button>
            <div style={{ marginTop: 12, fontSize: 10, color: "#3a2a2a" }}>Sem spam. Cancele quando quiser.</div>
          </>
        ) : (
          <div style={{ padding: "20px", background: "rgba(74,222,128,.07)", border: "1px solid rgba(74,222,128,.2)", borderRadius: 8 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 15, color: "#4ade80", fontWeight: "bold", marginBottom: 4 }}>Cupom enviado!</div>
            <div style={{ fontSize: 13, color: "#86efac" }}>Use <strong>BEMVINDO</strong> no carrinho.</div>
          </div>
        )}
      </div>
    </div>
  );
};

const WineThumb = ({ wine, size = "100%", height = "100%" }) => (
  <div style={{ width: size, height, position: "relative", overflow: "hidden", background: "#1a0808" }}>
    {wine.img
      ? <img src={wine.img} alt={wine.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      : <BottlePlaceholder size={typeof height === "number" ? height * 0.7 : 80} name={wine.name} />}
  </div>
);

// ── MiniCard ──────────────────────────────────────────────────────────────────
const MiniCard = ({ wine, onClick }) => {
  const activePrice = wine.promoPrice || wine.price;
  const shortDesc = wine.description ? wine.description.slice(0, 60) + (wine.description.length > 60 ? "…" : "") : "";
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div onClick={() => onClick(wine)} style={{ cursor: "pointer", background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, overflow: "hidden", transition: "all .25s", flexShrink: 0, width: 170 }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(139,44,44,.3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
        <WineThumb wine={wine} height="100%" />
        {wine.promoPrice && <span style={{ position: "absolute", top: 8, left: 8, background: "#b45309", color: "#fef3c7", fontSize: 9, padding: "2px 7px", borderRadius: 3, fontWeight: "bold", letterSpacing: 1 }}>-{discountPct(wine.price, wine.promoPrice)}%</span>}
        <span style={{ position: "absolute", top: 8, right: 8, background: "#8b2c2c", color: "#fff", fontSize: 8, padding: "2px 6px", borderRadius: 3 }}>{wine.category}</span>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 12, color: "#f5f0e8", fontWeight: "bold", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{wine.name}</div>
        <div style={{ fontSize: 9, color: "#7a6a6a", marginBottom: 4 }}>{wine.origin}{wine.year ? ` · ${wine.year}` : ""}</div>
        {shortDesc && <div style={{ fontSize: 10, color: "#6a5a5a", lineHeight: 1.4, marginBottom: 6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{shortDesc}</div>}
        <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: wine.promoPrice ? 5 : 0 }}>
          <span style={{ fontSize: 14, color: wine.promoPrice ? "#fbbf24" : "#e8b4b4", fontWeight: "bold" }}>{fmt(activePrice)}</span>
          {wine.promoPrice && <span style={{ fontSize: 10, color: "#5a4a4a", textDecoration: "line-through" }}>{fmt(wine.price)}</span>}
        </div>
        {wine.promoPrice && <PromoTimer wineId={wine.id} compact />}
      </div>
    </div>
  );
};

// ── SkeletonCard ──────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 12, overflow: "hidden" }}>
    <div style={{ width: "100%", aspectRatio: "1/1", background: "linear-gradient(90deg,#1a1410 25%,#2a1f1f 50%,#1a1410 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
    <div style={{ padding: "14px 14px 16px" }}>
      <div style={{ height: 14, background: "#2a1f1f", borderRadius: 4, marginBottom: 8, width: "75%", animation: "shimmer 1.4s infinite" }} />
      <div style={{ height: 10, background: "#1a1810", borderRadius: 4, marginBottom: 10, width: "50%", animation: "shimmer 1.4s infinite" }} />
      <div style={{ height: 20, background: "#2a1f1f", borderRadius: 4, width: "40%", animation: "shimmer 1.4s infinite" }} />
    </div>
  </div>
);

// ── ImageZoomModal ────────────────────────────────────────────────────────────
const ImageZoomModal = ({ wine, onClose }) => {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,.92)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn .2s ease", cursor: "zoom-out" }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: 600, maxHeight: "90vh", width: "90vw", cursor: "default" }}>
        <button onClick={onClose} style={{ position: "absolute", top: -14, right: -14, zIndex: 10, background: "#8b2c2c", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1/1" }}>
          <WineThumb wine={wine} height="100%" />
        </div>
        <div style={{ textAlign: "center", marginTop: 12, color: "#e8b4b4", fontSize: 14 }}>{wine.name} · {wine.year}</div>
        <div style={{ textAlign: "center", fontSize: 10, color: "#5a4a4a", marginTop: 3 }}>Pressione ESC ou clique fora para fechar</div>
      </div>
    </div>
  );
};

// ── Carrossel ────────────────────────────────────────────────────────────────
const Carousel = ({ items, onSelect, title, subtitle, accentColor = "#e8b4b4", autoPlay = true, visibleDesktop = 4, fadeMode = false }) => {
  const [winWidth, setWinWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const VISIBLE = winWidth <= 768 ? 2 : visibleDesktop;
  const [index, setIndex] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  const total = items.length;
  const maxIndex = Math.max(0, total - VISIBLE);

  const go = useCallback((dir) => {
    if (animating || total <= VISIBLE) return;
    setAnimDir(dir);
    setAnimating(true);
    const duration = fadeMode ? 280 : 320;
    setTimeout(() => {
      setIndex((prev) => {
        if (dir === "right") return prev >= maxIndex ? 0 : prev + 1;
        return prev <= 0 ? maxIndex : prev - 1;
      });
      setAnimating(false);
      setAnimDir(null);
    }, duration);
  }, [animating, maxIndex, total, fadeMode]);

  const startTimer = useCallback(() => {
    if (!autoPlay) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) go("right");
    }, fadeMode ? 3800 : 3200);
  }, [autoPlay, go, fadeMode]);

  useEffect(() => { setIndex(0); }, [items.length]);
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const visibleItems = total <= VISIBLE
    ? items
    : items.slice(index, index + VISIBLE).concat(
        index + VISIBLE > total ? items.slice(0, (index + VISIBLE) % total) : []
      );

  const dotCount = Math.max(1, total - VISIBLE + 1);

  // Animação: fadeMode usa opacity pura, slide usa translateX
  const trackStyle = fadeMode
    ? {
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(VISIBLE, total)}, 1fr)`,
        gap: 14,
        transition: animating ? "opacity .28s ease" : "none",
        opacity: animating ? 0 : 1,
      }
    : {
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(VISIBLE, total)}, 1fr)`,
        gap: 14,
        transition: animating ? "opacity .32s ease, transform .32s ease" : "none",
        opacity: animating ? 0.5 : 1,
        transform: animating
          ? `translateX(${animDir === "right" ? "-18px" : "18px"})`
          : "translateX(0)",
      };

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ marginTop: 52, paddingTop: 32, borderTop: "1px solid #2a1f1f" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 4 }}>{subtitle}</div>
          <h3 style={{ fontSize: 20, color: accentColor, letterSpacing: 1 }}>{title}</h3>
        </div>
        {total > VISIBLE && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Dots — fadeMode usa círculos sólidos, slide usa pill */}
            <div style={{ display: "flex", gap: fadeMode ? 7 : 6 }}>
              {Array.from({ length: dotCount }).map((_, i) => (
                <button key={i} onClick={() => { if (!animating) setIndex(i); }}
                  style={{
                    width: fadeMode ? 9 : (i === index ? 20 : 7),
                    height: fadeMode ? 9 : 7,
                    borderRadius: fadeMode ? "50%" : 4,
                    border: fadeMode ? `2px solid ${i === index ? accentColor : "#4a3a3a"}` : "none",
                    background: i === index ? accentColor : (fadeMode ? "transparent" : "#2a1f1f"),
                    cursor: "pointer",
                    transition: "all .3s ease",
                    padding: 0,
                  }} />
              ))}
            </div>
            {/* Arrows */}
            <button onClick={() => go("left")}
              style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid #2a1f1f`, background: "#1a1410", color: "#a09080", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a1f1f"; e.currentTarget.style.color = "#a09080"; }}>
              ‹
            </button>
            <button onClick={() => go("right")}
              style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid #2a1f1f`, background: "#1a1410", color: "#a09080", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a1f1f"; e.currentTarget.style.color = "#a09080"; }}>
              ›
            </button>
          </div>
        )}
      </div>

      {/* Track */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={trackStyle}>
          {visibleItems.map((wine) => {
            const activePrice = wine.promoPrice || wine.price;
            return (
              <div key={wine.id + "-" + index}
                onClick={() => onSelect(wine)}
                style={{ cursor: "pointer", background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, overflow: "hidden", transition: "all .25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(139,44,44,.3)"; e.currentTarget.style.borderColor = "#3a2a2a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#2a1f1f"; }}>
                {/* Imagem 1:1 */}
                <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                  <WineThumb wine={wine} height="100%" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 55%,rgba(12,10,9,.75))" }} />
                  {wine.promoPrice && (
                    <span style={{ position: "absolute", top: 8, left: 8, background: "#b45309", color: "#fef3c7", fontSize: 9, padding: "2px 7px", borderRadius: 3, fontWeight: "bold", letterSpacing: 1 }}>
                      -{discountPct(wine.price, wine.promoPrice)}%
                    </span>
                  )}
                  <span style={{ position: "absolute", top: 8, right: 8, background: "#8b2c2c", color: "#fff", fontSize: 8, padding: "2px 6px", borderRadius: 3 }}>{wine.category}</span>
                  <div style={{ position: "absolute", bottom: 8, left: 10, right: 10 }}>
                    <div style={{ fontSize: 9, color: "rgba(245,240,232,.55)" }}>{wine.origin} · {wine.year}</div>
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: "12px 12px 14px" }}>
                  <div style={{ fontSize: 12, color: "#f5f0e8", fontWeight: "bold", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{wine.name}</div>
                  <div style={{ marginBottom: 8, fontSize: 11 }}>
                    <span style={{ color: "#f59e0b" }}>{"★".repeat(Math.floor(wine.rating))}</span>
                    <span style={{ color: "#a09080", fontSize: 10, marginLeft: 4 }}>{wine.rating}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 15, color: wine.promoPrice ? "#fbbf24" : "#e8b4b4", fontWeight: "bold" }}>{fmt(activePrice)}</span>
                    {wine.promoPrice && <span style={{ fontSize: 10, color: "#5a4a4a", textDecoration: "line-through" }}>{fmt(wine.price)}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};





// WineFormFields removed — rendered inline inside App to avoid focus loss on re-render

// ── ReviewSection ─────────────────────────────────────────────────────────────
const StarPicker = ({ value, onChange, size = 24 }) => {
  const [hovered, setHovered] = useState(0);
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1,2,3,4,5].map((s) => (
        <span key={s}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          style={{ fontSize: size, cursor: "pointer", color: s <= (hovered || value) ? "#f59e0b" : "#2a1f1f", transition: "color .15s", userSelect: "none" }}>
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewSection = ({ wine, reviews, setReviews, reviewedWines = new Set(), setReviewedWines = () => {}, onSubmitReview = null }) => {
  const wineReviews = reviews.filter((r) => r.wineId === wine.id && r.approved);
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ author: "", rating: 0, comment: "", photo: null });
  const [formState, setFormState] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const photoRef = useRef(null);

  const displayed = showAll ? wineReviews : wineReviews.slice(0, 3);

  const avgRating = wineReviews.length
    ? (wineReviews.reduce((s, r) => s + r.rating, 0) / wineReviews.length).toFixed(1)
    : null;

  const distribution = [5,4,3,2,1].map((star) => ({
    star,
    count: wineReviews.filter((r) => r.rating === star).length,
    pct: wineReviews.length ? Math.round((wineReviews.filter((r) => r.rating === star).length / wineReviews.length) * 100) : 0,
  }));

  const handleSubmit = () => {
    if (reviewedWines.has(wine.id)) { setErrorMsg("Você já enviou uma avaliação para este vinho nesta sessão."); setFormState("error"); return; }
    if (!form.author.trim()) { setErrorMsg("Por favor, informe seu nome."); setFormState("error"); return; }
    if (form.rating === 0) { setErrorMsg("Por favor, selecione uma nota."); setFormState("error"); return; }
    if (form.comment.trim().length < 10) { setErrorMsg("Escreva um comentário com pelo menos 10 caracteres."); setFormState("error"); return; }
    const newReview = { id: Date.now(), wineId: wine.id, author: form.author.trim(), rating: form.rating, comment: form.comment.trim(), date: new Date().toLocaleDateString("pt-BR"), approved: false, photo: form.photo || null };
    setReviews((prev) => [newReview, ...prev]);
    setReviewedWines(prev => new Set([...prev, wine.id]));
    if (onSubmitReview) onSubmitReview(newReview);
    setForm({ author: "", rating: 0, comment: "", photo: null });
    setFormState("success");
    setErrorMsg("");
    setTimeout(() => setFormState("idle"), 5000);
  };

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #2a1f1f" }}>
      <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 6 }}>Opinião de quem comprou</div>
      <h3 style={{ fontSize: 20, color: "#f5f0e8", marginBottom: 24 }}>Avaliações</h3>

      {/* Resumo */}
      {wineReviews.length > 0 && (
        <div style={{ display: "flex", gap: 32, marginBottom: 32, flexWrap: "wrap" }}>
          {/* Nota grande */}
          <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 12, padding: "20px 28px", textAlign: "center", minWidth: 120 }}>
            <div style={{ fontSize: 48, fontWeight: "bold", color: "#f59e0b", lineHeight: 1 }}>{avgRating}</div>
            <div style={{ color: "#f59e0b", fontSize: 20, margin: "6px 0 4px" }}>{"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}</div>
            <div style={{ fontSize: 10, color: "#5a4a4a" }}>{wineReviews.length} avaliação{wineReviews.length > 1 ? "ões" : ""}</div>
          </div>
          {/* Barras */}
          <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
            {distribution.map(({ star, count, pct }) => (
              <div key={star} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#a09080", width: 14, textAlign: "right" }}>{star}</span>
                <span style={{ color: "#f59e0b", fontSize: 12 }}>★</span>
                <div style={{ flex: 1, height: 6, background: "#1a1410", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(to right,#b45309,#f59e0b)", borderRadius: 3, transition: "width .6s ease" }} />
                </div>
                <span style={{ fontSize: 10, color: "#5a4a4a", width: 18 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista */}
      {wineReviews.length === 0 ? (
        <div style={{ textAlign: "center", padding: "28px 0", color: "#5a4a4a", marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
          <div style={{ fontSize: 13 }}>Ainda sem avaliações. Seja o primeiro!</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
          {displayed.map((r) => (
            <div key={r.id} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "16px 18px", animation: "fadeIn .3s ease" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#8b2c2c,#5a1a1a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#e8b4b4", fontWeight: "bold" }}>
                    {r.author[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: "#f5f0e8", fontWeight: "bold" }}>{r.author}</div>
                    <div style={{ fontSize: 10, color: "#5a4a4a" }}>{r.date}</div>
                  </div>
                </div>
                <div style={{ color: "#f59e0b", fontSize: 14 }}>
                  {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#a09080", lineHeight: 1.7, margin: 0 }}>{r.comment}</p>
              {r.photo && (
                <img src={r.photo} alt={`Foto de ${r.author}`} loading="lazy" decoding="async"
                  style={{ marginTop: 10, width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8, border: "1px solid #2a1f1f" }} />
              )}
            </div>
          ))}

          {wineReviews.length > 3 && (
            <button onClick={() => setShowAll(!showAll)} style={{ background: "none", border: "1px solid #2a1f1f", borderRadius: 6, color: "#8b6060", padding: "10px", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1, transition: "all .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8b2c2c"; e.currentTarget.style.color = "#e8b4b4"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a1f1f"; e.currentTarget.style.color = "#8b6060"; }}>
              {showAll ? "▲ Mostrar menos" : `▼ Ver todas as ${wineReviews.length} avaliações`}
            </button>
          )}
        </div>
      )}

      {/* Formulário */}
      <div style={{ background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 12, padding: "22px 22px" }}>
        <div style={{ fontSize: 13, color: "#e8b4b4", fontWeight: "bold", marginBottom: 18 }}>✍️ Deixe sua avaliação</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 6 }}>Sua nota</label>
            <StarPicker value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} size={28} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 6 }}>Nome <span style={{ color: "#8b2c2c" }}>*</span></label>
            <input value={form.author} onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))} placeholder="Seu nome"
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 6 }}>Comentário <span style={{ color: "#8b2c2c" }}>*</span></label>
            <textarea value={form.comment} onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))} rows={3} placeholder="Conte sua experiência com este vinho..."
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", resize: "vertical" }} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 6 }}>Foto (opcional) 📸</label>
            <input type="file" accept="image/*" ref={photoRef} style={{ display: "none" }} onChange={e => {
              const f = e.target.files[0]; if (!f) return;
              const r = new FileReader(); r.onload = ev => setForm(p => ({ ...p, photo: ev.target.result })); r.readAsDataURL(f);
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button type="button" onClick={() => photoRef.current?.click()}
                style={{ padding: "7px 14px", background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 4, color: "#a09080", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                📷 Adicionar foto
              </button>
              {form.photo && (
                <>
                  <img src={form.photo} alt="preview" loading="lazy" decoding="async" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, border: "1px solid #3a2a2a" }} />
                  <button type="button" onClick={() => setForm(p => ({ ...p, photo: null }))}
                    style={{ background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 11 }}>✕ remover</button>
                </>
              )}
            </div>
          </div>
        </div>

        {formState === "error" && <div style={{ marginTop: 10, fontSize: 11, color: "#f87171" }}>⚠ {errorMsg}</div>}
        {formState === "success" && (
          <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(74,222,128,.07)", border: "1px solid rgba(74,222,128,.2)", borderRadius: 6, fontSize: 12, color: "#4ade80" }}>
            ✅ Avaliação enviada! Ela será publicada após aprovação.
          </div>
        )}

        <button onClick={handleSubmit} style={{ marginTop: 14, padding: "11px 24px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 2, textTransform: "uppercase", transition: "background .2s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#a83232"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#8b2c2c"}>
          Enviar Avaliação
        </button>
        <div style={{ fontSize: 9, color: "#3a2a2a", marginTop: 8 }}>Sua avaliação será publicada após aprovação da loja.</div>
      </div>
    </div>
  );
};

// ── FreteCalculator ───────────────────────────────────────────────────────────
const FreteCalculator = ({ wine }) => {
  const [cep, setCep] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const calcFrete = () => {
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) { setStatus("error"); return; }
    setStatus("loading");
    setOptions([]);
    setSelected(null);

    setTimeout(() => {
      // Simula frete por região via prefixo CEP
      const prefix = parseInt(clean.slice(0, 2));
      let region = "Sul/Sudeste";
      let pacDays = 5, sedexDays = 2;
      let pacBase = 18, sedexBase = 32;

      if (prefix <= 19) { region = "São Paulo (Capital)"; pacDays = 3; sedexDays = 1; pacBase = 14; sedexBase = 24; }
      else if (prefix <= 28) { region = "São Paulo (Interior)"; pacDays = 4; sedexDays = 1; pacBase = 16; sedexBase = 26; }
      else if (prefix <= 39) { region = "Minas Gerais"; pacDays = 5; sedexDays = 2; pacBase = 18; sedexBase = 29; }
      else if (prefix <= 49) { region = "Espírito Santo / Bahia"; pacDays = 6; sedexDays = 2; pacBase = 20; sedexBase = 32; }
      else if (prefix <= 56) { region = "Bahia"; pacDays = 7; sedexDays = 3; pacBase = 22; sedexBase = 35; }
      else if (prefix <= 63) { region = "Centro-Oeste"; pacDays = 8; sedexDays = 3; pacBase = 24; sedexBase = 38; }
      else if (prefix <= 72) { region = "Brasília / Goiás"; pacDays = 6; sedexDays = 2; pacBase = 20; sedexBase = 33; }
      else if (prefix <= 76) { region = "Norte / Nordeste"; pacDays = 10; sedexDays = 4; pacBase = 28; sedexBase = 44; }
      else if (prefix <= 79) { region = "Mato Grosso do Sul"; pacDays = 8; sedexDays = 3; pacBase = 23; sedexBase = 37; }
      else if (prefix <= 87) { region = "Paraná"; pacDays = 5; sedexDays = 2; pacBase = 17; sedexBase = 28; }
      else if (prefix <= 89) { region = "Santa Catarina"; pacDays = 5; sedexDays = 2; pacBase = 17; sedexBase = 28; }
      else { region = "Rio Grande do Sul"; pacDays = 6; sedexDays = 2; pacBase = 19; sedexBase = 31; }

      const weight = 1.5; // kg estimado por garrafa
      const pac = +(pacBase + weight * 2.5).toFixed(2);
      const sedex = +(sedexBase + weight * 4.0).toFixed(2);

      setOptions([
        { id: "pac",   label: "PAC",   icon: "📦", days: pacDays,   price: pac,   desc: `Correios PAC · ${region}` },
        { id: "sedex", label: "SEDEX", icon: "⚡", days: sedexDays, price: sedex, desc: `Correios SEDEX · ${region}` },
      ]);
      setStatus("done");
    }, 1400);
  };

  const formatCep = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
  };

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 10, padding: "18px 20px", marginTop: 4 }}>
      <div style={{ fontSize: 9, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase", marginBottom: 10 }}>📦 Calcular Frete e Entrega</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={cep}
          onChange={(e) => setCep(formatCep(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && calcFrete()}
          placeholder="00000-000"
          maxLength={9}
          style={{ flex: 1, background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 13px", color: "#f5f0e8", fontSize: 14, fontFamily: "Georgia,serif", letterSpacing: 2 }}
        />
        <button
          onClick={calcFrete}
          disabled={status === "loading"}
          style={{ padding: "10px 18px", background: status === "loading" ? "#2a1f1f" : "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: status === "loading" ? "not-allowed" : "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1, transition: "background .2s", whiteSpace: "nowrap" }}
        >
          {status === "loading" ? "Calculando…" : "Calcular"}
        </button>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0" }}>
          <div style={{ width: 18, height: 18, border: "2px solid #2a1f1f", borderTop: "2px solid #8b2c2c", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
          <span style={{ fontSize: 12, color: "#7a6a6a" }}>Consultando opções de entrega…</span>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div style={{ fontSize: 11, color: "#f87171", padding: "8px 0" }}>⚠ CEP inválido. Digite os 8 dígitos.</div>
      )}

      {/* Results */}
      {status === "done" && (
        <div>
          <div style={{ fontSize: 10, color: "#5a4a4a", marginBottom: 10 }}>Opções para o CEP {cep}:</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {options.map((opt) => (
              <div key={opt.id}
                onClick={() => setSelected(opt.id)}
                style={{ flex: 1, minWidth: 140, background: selected === opt.id ? "rgba(139,44,44,.2)" : "#1a1410", border: `1px solid ${selected === opt.id ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 8, padding: "12px 14px", cursor: "pointer", transition: "all .2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{opt.icon}</span>
                  <span style={{ fontSize: 13, color: "#f5f0e8", fontWeight: "bold" }}>{opt.label}</span>
                  {selected === opt.id && <span style={{ marginLeft: "auto", color: "#8b2c2c", fontSize: 14 }}>✓</span>}
                </div>
                <div style={{ fontSize: 16, color: "#e8b4b4", fontWeight: "bold", marginBottom: 3 }}>{fmt(opt.price)}</div>
                <div style={{ fontSize: 11, color: "#4ade80" }}>Chega em até <strong>{opt.days} dias úteis</strong></div>
                <div style={{ fontSize: 9, color: "#5a4a4a", marginTop: 3 }}>{opt.desc}</div>
              </div>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(74,222,128,.06)", border: "1px solid rgba(74,222,128,.2)", borderRadius: 6, fontSize: 12, color: "#4ade80" }}>
              ✅ {options.find(o => o.id === selected)?.label} selecionado · {fmt(options.find(o => o.id === selected)?.price)} · até {options.find(o => o.id === selected)?.days} dias úteis
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

// ── InfoSlider ────────────────────────────────────────────────────────────────
const INFO_SLIDES = [
  { icon: "🌍", text: "Vinhos importados das melhores regiões do mundo", accent: "#e8b4b4", bg: "linear-gradient(90deg,#1a0808,#2d1010,#1a0808)" },
  { icon: "🔒", text: "Pagamento 100% seguro — cartão, Pix e boleto", accent: "#4ade80", bg: "linear-gradient(90deg,#051a0e,#0a2a18,#051a0e)" },
  { icon: "💰", text: "5% OFF pagando com Pix — desconto automático", accent: "#fbbf24", bg: "linear-gradient(90deg,#1a1000,#2a1800,#1a1000)" },
];

const InfoSlider = () => {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((next) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setIdx(next); setAnimating(false); }, 220);
  }, [animating]);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go((idx + 1) % INFO_SLIDES.length), 3600);
    return () => clearInterval(timerRef.current);
  }, [idx, go]);

  const s = INFO_SLIDES[idx];

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ background: s.bg, borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)", transition: "background .5s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 44px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: 38 }}>
        <button onClick={() => go((idx - 1 + INFO_SLIDES.length) % INFO_SLIDES.length)}
          style={{ position: "absolute", left: 8, background: "none", border: "none", color: "rgba(255,255,255,.2)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "4px 8px", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.2)"}>‹</button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: animating ? 0 : 1, transition: "opacity .22s ease" }}>
          <span style={{ fontSize: 13 }}>{s.icon}</span>
          <span style={{ fontSize: 11, color: s.accent, letterSpacing: .3 }}>{s.text}</span>
          <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
            {INFO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => go(i)} style={{ width: i === idx ? 14 : 4, height: 4, borderRadius: 2, border: "none", background: i === idx ? s.accent : "rgba(255,255,255,.15)", cursor: "pointer", padding: 0, transition: "all .3s" }} />
            ))}
          </div>
        </div>

        <button onClick={() => go((idx + 1) % INFO_SLIDES.length)}
          style={{ position: "absolute", right: 8, background: "none", border: "none", color: "rgba(255,255,255,.2)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "4px 8px", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.2)"}>›</button>
      </div>
    </div>
  );
};
// ── ImageBannerCarousel — carrossel animado com imagens desktop/mobile ────────
const ImageBannerCarousel = ({ banners }) => {
  const active = banners.filter(b => b.active !== false);
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const goTo = useCallback((next) => {
    if (animating || next === idx) return;
    setPrev(idx);
    setAnimating(true);
    setIdx(next);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 550);
  }, [animating, idx]);

  useEffect(() => {
    if (active.length <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx(p => {
        const next = (p + 1) % active.length;
        setPrev(p); setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 550);
        return next;
      });
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [active.length]);

  if (active.length === 0) return null;

  const getBg = (b) => {
    const img = isMobile ? (b.imgMobile || b.imgDesktop) : b.imgDesktop;
    if (img) return { backgroundImage: `url(${img})`, backgroundSize: b.imgSize || "cover", backgroundPosition: b.imgPosition || "center" };
    return { background: b.bg || "linear-gradient(135deg,#1a0505,#2d0f0f)" };
  };

  const b = active[idx];
  const heightStyle = isMobile ? (b.heightMobile || 280) : (b.heightDesktop || 420);

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 0, width: "100%" }}>
      {/* Slide atual */}
      <div key={idx} style={{ ...getBg(b), height: heightStyle, display: "flex", alignItems: "center", justifyContent: b.contentAlign || "center", position: "relative", transition: "opacity .55s ease", animation: animating ? "bannerIn .55s ease" : "none" }}>
        {/* Overlay escuro */}
        <div style={{ position: "absolute", inset: 0, background: b.overlay || "rgba(0,0,0,0.38)" }} />
        {/* Conteúdo */}
        {(b.title || b.subtitle || b.cta) && (
          <div style={{ position: "relative", zIndex: 2, textAlign: b.textAlign || "center", padding: isMobile ? "0 20px" : "0 60px", maxWidth: 640, animation: "fadeIn .6s ease .1s both" }}>
            {b.tag && <div style={{ fontSize: 9, letterSpacing: 4, color: b.accent || "#e8b4b4", textTransform: "uppercase", marginBottom: 10, border: `1px solid ${b.accent || "#e8b4b4"}40`, display: "inline-block", padding: "3px 12px", borderRadius: 3 }}>{b.tag}</div>}
            {b.title && <h2 style={{ fontSize: isMobile ? 26 : 42, color: "#f5f0e8", fontWeight: "bold", lineHeight: 1.15, marginBottom: 8, textShadow: "0 2px 24px rgba(0,0,0,.7)" }}>{b.title}{b.titleAccent && <><br /><span style={{ color: b.accent || "#e8b4b4" }}>{b.titleAccent}</span></>}</h2>}
            {b.subtitle && <p style={{ fontSize: isMobile ? 12 : 15, color: "rgba(245,240,232,.8)", marginBottom: 20, lineHeight: 1.65 }}>{b.subtitle}</p>}
            {b.cta && <button style={{ padding: isMobile ? "9px 22px" : "12px 32px", background: b.accent || "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", fontSize: isMobile ? 10 : 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia,serif", fontWeight: "bold", boxShadow: "0 4px 16px rgba(0,0,0,.4)" }}>{b.cta}</button>}
          </div>
        )}
      </div>
      {/* Dots */}
      {active.length > 1 && (
        <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7 }}>
          {active.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === idx ? (b.accent || "#e8b4b4") : "rgba(255,255,255,.35)", cursor: "pointer", padding: 0, transition: "all .35s" }} />
          ))}
        </div>
      )}
      {/* Setas */}
      {active.length > 1 && (
        <>
          <button onClick={() => goTo((idx - 1 + active.length) % active.length)}
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(4px)", borderRadius: "50%", width: 36, height: 36, color: "#f5f0e8", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(139,44,44,.7)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,.45)"}>‹</button>
          <button onClick={() => goTo((idx + 1) % active.length)}
            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(4px)", borderRadius: "50%", width: 36, height: 36, color: "#f5f0e8", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(139,44,44,.7)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,.45)"}>›</button>
        </>
      )}
    </div>
  );
};

// ── ClientAccountPanel ────────────────────────────────────────────────────────
const ClientAccountPanel = (props) => {
  const { wines, addToCart, setSelectedWine, setPage, onClose, onOrderComplete } = props;
  const [authMode, setAuthMode] = useState(() => {
    try { return localStorage.getItem("v9_client") ? "loggedin" : "login"; } catch { return "login"; }
  });
  const [tab, setTab] = useState(props.initialTab || "orders");
  const [wishlist, setWishlist] = useState(() => { try { const s = localStorage.getItem("v9_wishlist_main"); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPwd, setRegPwd] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [authError, setAuthError] = useState("");

  // Cliente real salvo no localStorage
  const [client, setClient] = useState(() => {
    try {
      const s = localStorage.getItem("v9_client");
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  // 20: saveClient robusto — garante persistência no localStorage
  const saveClient = (c) => {
    setClient(c);
    try {
      if (c) {
        localStorage.setItem("v9_client", JSON.stringify(c));
        // Também atualiza no banco de clientes
        const all = JSON.parse(localStorage.getItem("v9_clients_db") || "{}");
        if (c.id) { all[c.id] = c; localStorage.setItem("v9_clients_db", JSON.stringify(all)); }
      } else {
        localStorage.removeItem("v9_client");
      }
    } catch {}
  };

  const tierColor = { Gold: "#fbbf24", Silver: "#c0c0c0", Bronze: "#cd7f32" }[client?.tier] || "#e8b4b4";
  const wishlistWines = wines.filter(w => wishlist.includes(w.id));

  const getTier = (pts) => pts >= 20000 ? "Gold" : pts >= 5000 ? "Silver" : "Bronze";
  const tierMeta = { Bronze: { next: "Silver", needed: 5000 }, Silver: { next: "Gold", needed: 20000 }, Gold: { next: null, needed: 20000 } };

  const handleLogin = () => {
    if (!loginEmail || !loginPwd) { setAuthError("Preencha e-mail e senha."); return; }
    // 24: Rate limiting simples — bloquear após 5 tentativas
    try {
      const attempts = JSON.parse(sessionStorage.getItem("v9_login_attempts") || '{"count":0,"until":0}');
      if (Date.now() < attempts.until) {
        const secs = Math.ceil((attempts.until - Date.now()) / 1000);
        setAuthError(`Muitas tentativas. Aguarde ${secs}s antes de tentar novamente.`); return;
      }
      const all = JSON.parse(localStorage.getItem("v9_clients_db") || "{}");
      const found = Object.values(all).find(c => c.email === loginEmail && c.pwd === loginPwd);
      if (found) {
        sessionStorage.removeItem("v9_login_attempts");
        saveClient(found); setAuthMode("loggedin"); setAuthError("");
      } else {
        const newCount = (attempts.count || 0) + 1;
        const newUntil = newCount >= 5 ? Date.now() + 60000 : 0;
        sessionStorage.setItem("v9_login_attempts", JSON.stringify({ count: newCount, until: newUntil }));
        const rem = 5 - newCount;
        setAuthError(rem > 0
          ? `E-mail ou senha incorretos. ${rem} tentativa${rem > 1 ? "s" : ""} restante${rem > 1 ? "s" : ""}.`
          : "Conta bloqueada por 60 segundos após muitas tentativas.");
      }
    } catch { setAuthError("Erro ao fazer login."); }
  };

  // 24+25+26: Validação forte de senha
  const pwdRules = [
    { test: (p) => p.length >= 8,                    label: "8 ou mais caracteres" },
    { test: (p) => /[A-Z]/.test(p),                   label: "Uma letra maiúscula" },
    { test: (p) => /[0-9]/.test(p),                   label: "Um número" },
    { test: (p) => /[!@#$%^&*()\-_,.?|<>]/.test(p),  label: "Um caractere especial" },
  ];
  const pwdScore = pwdRules.filter(r => r.test(regPwd)).length;
  const pwdColors = ["#ef4444", "#f87171", "#fbbf24", "#4ade80", "#22c55e"];
  const pwdLabels = ["", "Fraca", "Média", "Forte", "Muito forte"];

  const handleRegister = () => {
    if (!regName || !regEmail || !regPwd) { setAuthError("Preencha todos os campos obrigatórios."); return; }
    // 24: Validação forte de senha
    if (pwdScore < 3) { setAuthError("Senha muito fraca. " + pwdRules.filter(r => !r.test(regPwd)).map(r => r.label).join(", ") + "."); return; }
    // 24: Validar formato de e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) { setAuthError("Informe um e-mail válido."); return; }
    // 25: Verificar e-mail duplicado
    try {
      const all = JSON.parse(localStorage.getItem("v9_clients_db") || "{}");
      const emailTaken = Object.values(all).some(c => c.email.toLowerCase() === regEmail.toLowerCase());
      if (emailTaken) { setAuthError("Este e-mail já está cadastrado. Faça login ou use outro e-mail."); return; }
    } catch {}
    const newClient = {
      id: `c_${Date.now()}`, name: regName, email: regEmail, pwd: regPwd, phone: regPhone,
      since: new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      tier: "Bronze", points: 200, orders: [],
      pointsHistory: [{ date: new Date().toLocaleDateString("pt-BR"), desc: "Boas-vindas", pts: 200 }],
      savedCoupons: ["BEMVINDO"],
    };
    try {
      const all = JSON.parse(localStorage.getItem("v9_clients_db") || "{}");
      all[newClient.id] = newClient;
      localStorage.setItem("v9_clients_db", JSON.stringify(all));
    } catch {}
    saveClient(newClient);
    setAuthMode("loggedin"); setAuthError("");
    sendEmail("boasVindas", { to_email: regEmail, to_name: regName, store_name: "Vinhos9", coupon_code: "BEMVINDO" });
  };

  // Atualiza cliente no DB quando muda
  const updateClientDB = (updated) => {
    saveClient(updated);
    try {
      const all = JSON.parse(localStorage.getItem("v9_clients_db") || "{}");
      if (updated.id) { all[updated.id] = updated; localStorage.setItem("v9_clients_db", JSON.stringify(all)); }
    } catch {}
  };

  const TABS = [
    ["orders", "📦", "Pedidos"],
    ["pontos", "🪙", "Pontos"],
    ["wishlist", "❤️", "Favoritos"],
    ["coupons", "🎁", "Cupons"],
    ["profile", "👤", "Perfil"],
  ];

  const inputStyle = { width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "11px 13px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", outline: "none" };

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 460, height: "100vh", background: "#0e0c0b", borderLeft: "1px solid #2a1f1f", display: "flex", flexDirection: "column", animation: "slideIn .3s ease", overflowY: "auto" }}>

        {/* ── TELA DE LOGIN ── */}
        {authMode === "login" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 28px" }}>
            <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 18 }}>✕</button>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <img src={LOGO_URI} alt="Vinhos9" style={{ height: 72, width: "auto", margin: "0 auto 10px", display: "block" }} />
              <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 6 }}>Vinhos9</div>
              <h2 style={{ fontSize: 21, color: "#e8b4b4" }}>Bem-vindo de volta</h2>
              <p style={{ fontSize: 12, color: "#5a4a4a", marginTop: 5 }}>Acesse sua conta para ver pedidos e favoritos</p>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>E-mail</label>
              <input
                value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{ ...inputStyle, borderColor: loginEmail.length > 4 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail) ? "#ef4444" : "#2a1f1f" }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Senha</label>
              <div style={{ position: "relative" }}>
                <input type={showPwd ? "text" : "password"} value={loginPwd} onChange={e => setLoginPwd(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={{ ...inputStyle, paddingRight: 42 }} />
                <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 13 }}>{showPwd ? "🙈" : "👁"}</button>
              </div>
            </div>
            {authError && (
              <div style={{ fontSize: 11, color: "#f87171", marginBottom: 10, padding: "8px 12px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 6 }}>
                ⚠ {authError}
              </div>
            )}
            <button onClick={handleLogin} style={{ width: "100%", padding: "13px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
              Entrar
            </button>
            {/* 24: Selos de segurança */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              {[["🔒","SSL"],["🛡️","Seguro"],["🔐","Criptografado"]].map(([ic,lb]) => (
                <div key={lb} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#3a2a2a" }}>
                  <span>{ic}</span><span>{lb}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 12, color: "#5a4a4a" }}>Ainda não tem conta? </span>
              <button onClick={() => { setAuthMode("register"); setAuthError(""); }} style={{ background: "none", border: "none", color: "#e8b4b4", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", textDecoration: "underline" }}>Criar conta grátis</button>
            </div>
          </div>
        )}

        {/* ── TELA DE CADASTRO ── */}
        {authMode === "register" && (
          <div style={{ flex: 1, padding: "28px 28px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
              <button onClick={() => { setAuthMode("login"); setAuthError(""); }} style={{ background: "none", border: "none", color: "#7a6a6a", cursor: "pointer", fontSize: 18 }}>←</button>
              <div>
                <h2 style={{ fontSize: 19, color: "#e8b4b4" }}>Criar Conta</h2>
                <p style={{ fontSize: 11, color: "#5a4a4a", marginTop: 2 }}>Cadastre-se e acompanhe seus pedidos</p>
              </div>
              <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>

            {/* Campos básicos */}
            {[
              ["Nome completo *", regName, setRegName, "text", "João da Silva"],
              ["Telefone", regPhone, setRegPhone, "tel", "(11) 99999-0000"],
            ].map(([label, val, setter, type, ph]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>{label}</label>
                <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={inputStyle} />
              </div>
            ))}

            {/* 25: E-mail com verificação de duplicado em tempo real */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>E-mail *</label>
              <div style={{ position: "relative" }}>
                <input
                  type="email" value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="joao@email.com"
                  style={{ ...inputStyle, paddingRight: 36,
                    borderColor: regEmail.length > 4 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)
                      ? "#ef4444"
                      : regEmail.length > 4 && (() => { try { return Object.values(JSON.parse(localStorage.getItem("v9_clients_db")||"{}")).some(c => c.email.toLowerCase() === regEmail.toLowerCase()); } catch { return false; } })()
                      ? "#f87171"
                      : regEmail.length > 4 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail) ? "#4ade80" : "#2a1f1f"
                  }}
                />
                {regEmail.length > 4 && (
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13 }}>
                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)
                      ? (() => { try { return Object.values(JSON.parse(localStorage.getItem("v9_clients_db")||"{}")).some(c => c.email.toLowerCase() === regEmail.toLowerCase()); } catch { return false; } })()
                        ? "❌" : "✅"
                      : "⚠️"
                    }
                  </span>
                )}
              </div>
              {/* 25: Aviso de e-mail duplicado */}
              {regEmail.length > 4 && (() => { try { return Object.values(JSON.parse(localStorage.getItem("v9_clients_db")||"{}")).some(c => c.email.toLowerCase() === regEmail.toLowerCase()); } catch { return false; } })() && (
                <div style={{ fontSize: 11, color: "#f87171", marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
                  ⚠ E-mail já cadastrado.
                  <button onClick={() => { setAuthMode("login"); setLoginEmail(regEmail); setAuthError(""); }}
                    style={{ background: "none", border: "none", color: "#e8b4b4", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif", textDecoration: "underline", padding: 0 }}>
                    Fazer login?
                  </button>
                </div>
              )}
            </div>

            {/* 24+26: Senha com indicador de força */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Senha *</label>
              <div style={{ position: "relative" }}>
                <input type={showPwd ? "text" : "password"} value={regPwd}
                  onChange={e => setRegPwd(e.target.value)} placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 42,
                    borderColor: regPwd.length > 0 ? pwdColors[pwdScore] : "#2a1f1f" }} />
                <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 13 }}>{showPwd ? "🙈" : "👁"}</button>
              </div>

              {/* 26: Barra de força */}
              {regPwd.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  {/* Barra visual */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < pwdScore ? pwdColors[pwdScore] : "#2a1f1f", transition: "background .3s" }} />
                    ))}
                  </div>
                  {/* Label de força */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: pwdColors[pwdScore], fontWeight: "bold" }}>
                      {pwdLabels[pwdScore] || "Muito fraca"}
                    </span>
                    <span style={{ fontSize: 10, color: "#5a4a4a" }}>{pwdScore}/4 requisitos</span>
                  </div>
                  {/* Checklist de regras */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 8px" }}>
                    {pwdRules.map(rule => {
                      const ok = rule.test(regPwd);
                      return (
                        <div key={rule.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10 }}>
                          <span style={{ color: ok ? "#4ade80" : "#5a4a4a", fontSize: 11, flexShrink: 0 }}>{ok ? "✓" : "○"}</span>
                          <span style={{ color: ok ? "#86efac" : "#5a4a4a" }}>{rule.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {authError && (
              <div style={{ fontSize: 11, color: "#f87171", marginBottom: 12, padding: "9px 12px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 6 }}>
                ⚠ {authError}
              </div>
            )}
            <div style={{ background: "rgba(139,44,44,.07)", border: "1px solid rgba(139,44,44,.2)", borderRadius: 6, padding: "10px 13px", marginBottom: 18, fontSize: 11, color: "#8b6060", lineHeight: 1.6 }}>
              🎁 Ganhe <strong style={{ color: "#e8b4b4" }}>200 pontos</strong> + cupom <strong style={{ color: "#fbbf24" }}>BEMVINDO</strong> com 5% OFF na primeira compra.
            </div>
            <button onClick={handleRegister}
              disabled={pwdScore < 3}
              style={{ width: "100%", padding: "13px", background: pwdScore < 3 ? "#2a1f1f" : "#8b2c2c", border: "none", borderRadius: 4, color: pwdScore < 3 ? "#5a4a4a" : "#fff", cursor: pwdScore < 3 ? "not-allowed" : "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, transition: "all .3s" }}>
              {pwdScore < 3 ? `Senha muito fraca (${pwdScore}/4 req.)` : "Criar Minha Conta"}
            </button>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 12, color: "#5a4a4a" }}>Já tem conta? </span>
              <button onClick={() => { setAuthMode("login"); setAuthError(""); }} style={{ background: "none", border: "none", color: "#e8b4b4", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", textDecoration: "underline" }}>Entrar</button>
            </div>
          </div>
        )}

        {/* ── PAINEL LOGADO ── */}
        {authMode === "loggedin" && (<>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#1a0a0a,#2d1010)", padding: "24px 20px 20px", borderBottom: "1px solid #2a1f1f", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 8, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase", marginBottom: 3 }}>Minha Conta</div>
              <div style={{ fontSize: 19, color: "#f5f0e8", fontWeight: "bold" }}>{client.name}</div>
              <div style={{ fontSize: 11, color: "#7a6a6a", marginTop: 2 }}>{client.email}</div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#7a6a6a", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[[" ⭐","Nível",client?.tier || "Bronze",tierColor],["🪙","Pontos",(client?.points || 0).toLocaleString("pt-BR"),"#e8b4b4"],["📅","Desde",client?.since || "—","#a09080"]].map(([icon,label,val,col]) => (
              <div key={label} style={{ background: "rgba(0,0,0,.3)", border: "1px solid #2a1f1f", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 8, color: "#5a4a4a", letterSpacing: 2, textTransform: "uppercase" }}>{label}</div>
                  <div style={{ fontSize: 12, color: col, fontWeight: "bold" }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #2a1f1f", flexShrink: 0, background: "#100c0c" }}>
          {TABS.map(([t, icon, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px 4px", background: "none", border: "none", borderBottom: tab === t ? "2px solid #8b2c2c" : "2px solid transparent", color: tab === t ? "#e8b4b4" : "#5a4a4a", cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "color .2s" }}>
              <span style={{ fontSize: 15 }}>{icon}</span>
              <span style={{ letterSpacing: .5 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "20px 18px", overflowY: "auto" }}>
          {tab === "orders" && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 14 }}>Histórico de Compras ({(client?.orders || []).length})</div>
              {(client?.orders || []).length === 0 && <div style={{ textAlign: "center", padding: 32, color: "#5a4a4a", fontSize: 12 }}>Nenhuma compra ainda. Explore o catálogo! 🍷</div>}
              {(client?.orders || []).map((order) => {
                const statusColors = { "Entregue": "#4ade80", "Em trânsito": "#fbbf24", "Aguardando": "#a09080" };
                const statusBg = { "Entregue": "#1a3a1a", "Em trânsito": "#2a2510", "Aguardando": "#1a1a1a" };
                return (
                  <div key={order.id} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#e8b4b4", fontWeight: "bold" }}>{order.id}</span>
                      <span style={{ fontSize: 9, padding: "2px 10px", borderRadius: 10, background: statusBg[order.status] || "#1a1a1a", color: statusColors[order.status] || "#a09080" }}>{order.status}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#5a4a4a", marginBottom: 8 }}>{order.date}</div>
                    {(order.wines || [order.items]).filter(Boolean).map((w, i) => <div key={i} style={{ fontSize: 11, color: "#a09080", marginBottom: 2 }}>· {w}</div>)}
                    <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #1a1410", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#e8b4b4", fontWeight: "bold" }}>{fmt(order.total)}</span>
                      {order.pts && <span style={{ fontSize: 10, color: "#fbbf24" }}>+{order.pts} pts</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "pontos" && (
            <div>
              {/* Saldo atual */}
              <div style={{ background: "linear-gradient(145deg,#1a1a0e,#12100a)", border: "1px solid #3a3a1a", borderRadius: 10, padding: "20px 18px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: "#7a7a2a", textTransform: "uppercase", marginBottom: 8 }}>Saldo de Pontos</div>
                <div style={{ fontSize: 36, color: "#fbbf24", fontWeight: "bold", marginBottom: 4 }}>{(client?.points || 0).toLocaleString("pt-BR")} <span style={{ fontSize: 14, color: "#7a7a2a" }}>pts</span></div>
                <div style={{ fontSize: 11, color: "#5a5a2a", marginBottom: 12 }}>R$ 1 gasto = 100 pontos</div>
                {/* Barra de nível */}
                {(() => {
                  const pts = client?.points || 0;
                  const tier = getTier(pts);
                  const meta = tierMeta[tier];
                  const pct = meta.next ? Math.min(100, (pts / meta.needed) * 100) : 100;
                  return (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#5a4a4a", marginBottom: 4 }}>
                        <span style={{ color: tierColor }}>⭐ {tier}</span>
                        {meta.next ? <span>{pts.toLocaleString()} / {meta.needed.toLocaleString()} pts → {meta.next}</span> : <span style={{ color: "#fbbf24" }}>Nível máximo! 🏆</span>}
                      </div>
                      <div style={{ background: "#2a2a1a", borderRadius: 6, height: 7, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(to right, ${tierColor}88, ${tierColor})`, borderRadius: 6, transition: "width .5s" }} />
                      </div>
                    </div>
                  );
                })()}
              </div>
              {/* Histórico */}
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 12 }}>Histórico de Pontos</div>
              {(client?.pointsHistory || []).length === 0 && <div style={{ textAlign: "center", padding: 24, color: "#5a4a4a", fontSize: 12 }}>Nenhuma movimentação ainda.</div>}
              {[...(client?.pointsHistory || [])].reverse().map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1a1410" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#f5f0e8" }}>{h.desc}</div>
                    <div style={{ fontSize: 10, color: "#5a4a4a", marginTop: 2 }}>{h.date}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: h.pts > 0 ? "#4ade80" : "#ef4444" }}>
                    {h.pts > 0 ? "+" : ""}{h.pts} pts
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 14 }}>Favoritos ({wishlistWines.length})</div>
              {wishlistWines.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px", color: "#5a4a4a", fontSize: 12 }}>Sua lista está vazia. Navegue pelo catálogo! ❤️</div>
              ) : wishlistWines.map((wine) => (
                <div key={wine.id} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "12px 14px", marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}><WineThumb wine={wine} height={50} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "#f5f0e8", fontWeight: "bold", marginBottom: 2 }}>{wine.name}</div>
                    <div style={{ fontSize: 10, color: "#7a6a6a" }}>{wine.origin} · {wine.year}</div>
                    <div style={{ fontSize: 13, color: wine.promoPrice ? "#fbbf24" : "#e8b4b4", fontWeight: "bold", marginTop: 2 }}>{fmt(wine.promoPrice || wine.price)}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <button onClick={() => addToCart(wine)} style={{ background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", padding: "5px 10px", cursor: "pointer", fontSize: 9, fontFamily: "Georgia,serif", letterSpacing: 1 }}>+ Carrinho</button>
                    <button onClick={() => setWishlist(p => p.filter(id => id !== wine.id))} style={{ background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: "#5a4a4a", padding: "4px 10px", cursor: "pointer", fontSize: 9, fontFamily: "Georgia,serif" }}>Remover</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "coupons" && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 14 }}>Seus Cupons</div>
              {(client?.savedCoupons || []).length === 0 && <div style={{ textAlign: "center", padding: 24, color: "#5a4a4a", fontSize: 12 }}>Nenhum cupom disponível.</div>}
              {(client?.savedCoupons || []).map((code) => (
                <div key={code} style={{ background: "linear-gradient(145deg,#1a1500,#120e00)", border: "1px dashed #3a2a00", borderRadius: 10, padding: "16px 18px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 17, color: "#fbbf24", fontWeight: "bold", letterSpacing: 2 }}>{code}</div>
                    <div style={{ fontSize: 10, color: "#7a6060", marginTop: 4 }}>Cupom de desconto — use no carrinho</div>
                  </div>
                  <div style={{ fontSize: 22 }}>🎁</div>
                </div>
              ))}
              <div style={{ background: "rgba(74,222,128,.05)", border: "1px solid rgba(74,222,128,.15)", borderRadius: 10, padding: "14px 16px", marginTop: 8 }}>
                <div style={{ fontSize: 10, color: "#4ade80", marginBottom: 6, letterSpacing: 1 }}>🪙 Seus pontos</div>
                <div style={{ background: "#1a3a1a", borderRadius: 6, height: 6, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ height: "100%", width: `${Math.min(100, ((client?.points || 0) / 5000) * 100)}%`, background: "linear-gradient(to right,#166534,#4ade80)", borderRadius: 6 }} />
                </div>
                <div style={{ fontSize: 10, color: "#5a4a4a" }}>{(client?.points || 0).toLocaleString()} / 5.000 pontos para nível Gold</div>
              </div>
            </div>
          )}

          {tab === "profile" && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 14 }}>Informações Pessoais</div>
              {[["Nome completo", client?.name],["E-mail", client?.email],["Telefone", client?.phone || "—"],["Cliente desde", client?.since || "—"]].map(([label, value]) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
                  <div style={{ background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 13px", fontSize: 13, color: "#f5f0e8", fontFamily: "Georgia,serif" }}>{value}</div>
                </div>
              ))}
              <button onClick={() => { saveClient(null); try { localStorage.removeItem("v9_client"); } catch {} setAuthMode("login"); setLoginEmail(""); setLoginPwd(""); }}
                style={{ marginTop: 8, width: "100%", padding: "11px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: "#7a6a6a", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif", letterSpacing: 1 }}>
                🚪 Sair da conta
              </button>
              {/* Zona de perigo — deletar conta */}
              <div style={{ marginTop: 24, padding: "18px", background: "rgba(127,29,29,.12)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#fca5a5", fontWeight: "bold", marginBottom: 8 }}>⚠️ Zona de Perigo</div>
                <p style={{ fontSize: 12, color: "#9a7a7a", lineHeight: 1.7, marginBottom: 14 }}>
                  Ao excluir sua conta, <strong style={{ color: "#fca5a5" }}>todos os seus dados serão apagados permanentemente</strong>: histórico de pedidos, pontos, favoritos e cupons. Esta ação <strong style={{ color: "#fca5a5" }}>não pode ser desfeita</strong>.
                </p>
                <button onClick={() => {
                  if (!window.confirm(
                    "⚠️ ATENÇÃO — Excluir conta?\n\n" +
                    "Isso irá apagar permanentemente:\n" +
                    "• Todos os seus pedidos\n" +
                    "• Seus pontos acumulados\n" +
                    "• Sua lista de favoritos\n" +
                    "• Seus cupons salvos\n\n" +
                    "Esta ação NÃO pode ser desfeita.\n\n" +
                    "Clique OK para confirmar a exclusão."
                  )) return;
                  try {
                    const all = JSON.parse(localStorage.getItem("v9_clients_db") || "{}");
                    if (client?.id) delete all[client.id];
                    localStorage.setItem("v9_clients_db", JSON.stringify(all));
                    localStorage.removeItem("v9_client");
                    localStorage.removeItem("v9_wishlist_main");
                  } catch {}
                  saveClient(null);
                  setAuthMode("login");
                  setLoginEmail(""); setLoginPwd("");
                }}
                  style={{ width: "100%", padding: "11px", background: "#7f1d1d", border: "none", borderRadius: 4, color: "#fca5a5", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1 }}>
                  🗑️ Excluir Minha Conta Permanentemente
                </button>
              </div>
            </div>
          )}
        </div>
        </>)}
      </div>
    </div>
  );
};



// ── HomeCarousel — carrossel com swipe touch para home ────────────────────────
const HomeCarousel = ({ items, title, subtitle, accentColor, badge, onSelect, addToCart }) => {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState(null);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const VISIBLE = winW <= 480 ? 2 : winW <= 768 ? 3 : 4;
  const total = items.length;
  const maxIdx = Math.max(0, total - VISIBLE);

  const go = useCallback((d) => {
    if (animating || total <= VISIBLE) return;
    setDir(d);
    setAnimating(true);
    setTimeout(() => {
      setIdx(prev => {
        if (d === "r") return prev >= maxIdx ? 0 : prev + 1;
        return prev <= 0 ? maxIdx : prev - 1;
      });
      setAnimating(false);
      setDir(null);
    }, 300);
  }, [animating, maxIdx, total, VISIBLE]);

  useEffect(() => {
    if (total <= VISIBLE) return;
    timerRef.current = setInterval(() => { if (!pausedRef.current) go("r"); }, 3500);
    return () => clearInterval(timerRef.current);
  }, [go, total, VISIBLE]);

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    pausedRef.current = true;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      go(dx < 0 ? "r" : "l");
    }
    touchStartX.current = null;
    setTimeout(() => { pausedRef.current = false; }, 1000);
  };

  const visibleItems = total <= VISIBLE
    ? items
    : items.slice(idx, idx + VISIBLE).concat(
        idx + VISIBLE > total ? items.slice(0, (idx + VISIBLE) % total) : []
      );

  const dotCount = Math.max(1, total - VISIBLE + 1);

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ marginBottom: 48 }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 3, height: 28, background: accentColor, borderRadius: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase", marginBottom: 3 }}>{subtitle}</div>
            <h3 style={{ fontSize: 20, color: accentColor }}>{title}</h3>
          </div>
        </div>
        {total > VISIBLE && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {Array.from({ length: dotCount }).map((_, i) => (
                <button key={i} onClick={() => { if (!animating) setIdx(i); }}
                  style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 3, border: "none", background: i === idx ? accentColor : "#2a1f1f", cursor: "pointer", transition: "all .3s", padding: 0 }} />
              ))}
            </div>
            <button onClick={() => go("l")} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #2a1f1f", background: "#1a1410", color: "#a09080", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={() => go("r")} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #2a1f1f", background: "#1a1410", color: "#a09080", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          </div>
        )}
      </div>

      {/* Track com swipe touch */}
      <div style={{ overflow: "hidden" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(VISIBLE, total)}, 1fr)`,
          gap: winW <= 768 ? 10 : 14,
          transition: animating ? "opacity .3s ease, transform .3s ease" : "none",
          opacity: animating ? 0.4 : 1,
          transform: animating ? `translateX(${dir === "r" ? "-14px" : "14px"})` : "none",
        }}>
          {visibleItems.map((wine) => {
            const activePrice = wine.promoPrice || wine.price;
            return (
              <div key={wine.id + "-" + idx} onClick={() => onSelect(wine)}
                style={{ cursor: "pointer", background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 12, overflow: "hidden", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(139,44,44,.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                  <WineThumb wine={wine} height="100%" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 50%,rgba(12,10,9,.8))" }} />
                  {wine.promoPrice && (
                    <span style={{ position: "absolute", top: 7, left: 7, background: "#b45309", color: "#fef3c7", fontSize: 9, padding: "2px 6px", borderRadius: 3, fontWeight: "bold" }}>
                      -{discountPct(wine.price, wine.promoPrice)}%
                    </span>
                  )}
                  {badge && (
                    <span style={{ position: "absolute", bottom: 7, left: 7, background: badge.bg, color: "#fff", fontSize: 8, padding: "2px 7px", borderRadius: 10, letterSpacing: 1 }}>
                      {typeof badge.text === "function" ? badge.text(wine) : badge.text}
                    </span>
                  )}
                </div>
                <div style={{ padding: "10px 10px 12px" }}>
                  <div style={{ fontSize: 12, color: "#f5f0e8", fontWeight: "bold", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{wine.name}</div>
                  <div style={{ fontSize: 10, color: "#7a6a6a", marginBottom: 4 }}>{wine.origin}{wine.year ? ` · ${wine.year}` : ""}</div>
                  {wine.description && <div style={{ fontSize: 10, color: "#6a5a5a", lineHeight: 1.45, marginBottom: 6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{wine.description.slice(0, 72)}{wine.description.length > 72 ? "…" : ""}</div>}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: wine.promoPrice ? 5 : 8 }}>
                    <span style={{ fontSize: 15, color: wine.promoPrice ? "#fbbf24" : accentColor, fontWeight: "bold" }}>{fmt(activePrice)}</span>
                    {wine.promoPrice && <span style={{ fontSize: 10, color: "#5a4a4a", textDecoration: "line-through" }}>{fmt(wine.price)}</span>}
                  </div>
                  {wine.promoPrice && <div style={{ marginBottom: 8 }}><PromoTimer wineId={wine.id} compact /></div>}
                  <button className="btn-red" onClick={e => { e.stopPropagation(); addToCart(wine); }} disabled={wine.stock === 0}
                    style={{ width: "100%", padding: "7px", borderRadius: 4, fontSize: 10, letterSpacing: 1, background: wine.stock === 0 ? "#2a1f1f" : "#8b2c2c", color: wine.stock === 0 ? "#5a4a4a" : "#fff", cursor: wine.stock === 0 ? "not-allowed" : "pointer" }}>
                    {wine.stock === 0 ? "Esgotado" : "🛒 Carrinho"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── CartFreteSelector — seleção de frete no carrinho com busca de CEP (ViaCEP) ─
const CartFreteSelector = ({ freteConfig, cartTotal, freteEscolhido, setFreteEscolhido, onCepFill }) => {
  const [cep, setCep] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [cepOk, setCepOk] = useState(false);
  const [cepErro, setCepErro] = useState("");
  const opcoes = freteConfig?.opcoes || [];

  const buscarCep = async (val) => {
    const clean = val.replace(/\D/g,"");
    if (clean.length !== 8) return;
    setBuscando(true); setCepErro(""); setCepOk(false);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (data.erro) { setCepErro("CEP não encontrado."); setBuscando(false); return; }
      setCepOk(true);
      onCepFill({ cep: val, rua: data.logradouro || "", bairro: data.bairro || "", cidade: data.localidade || "", uf: data.uf || "" });
    } catch { setCepErro("Erro ao consultar CEP."); }
    setBuscando(false);
  };

  const handleCepChange = (e) => {
    const d = e.target.value.replace(/\D/g,"").slice(0,8);
    const fmt = d.length > 5 ? d.slice(0,5)+"-"+d.slice(5) : d;
    setCep(fmt); setCepOk(false); setCepErro("");
    if (d.length === 8) buscarCep(fmt);
  };

  // Calcula frete grátis
  const freteGratis = opcoes.find(o => o.id === "gratis" && o.minValue);
  const faltaGratis = freteGratis ? Math.max(0, freteGratis.minValue - cartTotal) : 0;

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 10 }}>🚚 Frete & Entrega</div>

      {/* Barra frete grátis — sempre visível quando opção configurada */}
      {freteGratis && (
        <div style={{ marginBottom: 12, background: faltaGratis === 0 ? "rgba(74,222,128,.09)" : "rgba(251,191,36,.07)", border: `1px solid ${faltaGratis === 0 ? "rgba(74,222,128,.3)" : "rgba(251,191,36,.2)"}`, borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: faltaGratis === 0 ? "#4ade80" : "#fbbf24", marginBottom: 6 }}>
            <span>{faltaGratis === 0 ? "🎉 Frete grátis desbloqueado!" : `Frete grátis acima de ${fmt(freteGratis.minValue)}`}</span>
            {faltaGratis > 0 && <span style={{ fontWeight: "bold" }}>Falta {fmt(faltaGratis)}</span>}
          </div>
          <div style={{ height: 5, background: "#2a2a10", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(100, (cartTotal / freteGratis.minValue) * 100)}%`, background: faltaGratis === 0 ? "linear-gradient(to right,#166534,#4ade80)" : "linear-gradient(to right,#b45309,#fbbf24)", borderRadius: 3, transition: "width .5s ease" }} />
          </div>
          {faltaGratis > 0 && (
            <div style={{ fontSize: 10, color: "#8a7a5a", marginTop: 5 }}>
              Adicione mais {fmt(faltaGratis)} em produtos para ganhar frete grátis ({freteGratis.prazo || "7 dias úteis"})
            </div>
          )}
        </div>
      )}

      {/* Campo CEP — integração ViaCEP */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "#7a6a6a", marginBottom: 5 }}>Digite seu CEP para calcular:</div>
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input value={cep} onChange={handleCepChange} placeholder="00000-000" maxLength={9}
              style={{ width: "100%", background: "#0c0a09", border: `1px solid ${cepOk ? "#4ade80" : cepErro ? "#ef4444" : "#2a1f1f"}`, borderRadius: 4, padding: "8px 32px 8px 10px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12 }}>
              {buscando ? "⏳" : cepOk ? "✅" : cepErro ? "❌" : ""}
            </span>
          </div>
          <a href="https://buscacepinter.correios.com.br" target="_blank" rel="noreferrer"
            style={{ padding: "8px 10px", background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 4, color: "#8b6060", fontSize: 10, textDecoration: "none", display: "flex", alignItems: "center", whiteSpace: "nowrap", fontFamily: "Georgia,serif" }}>
            Não sei
          </a>
        </div>
        {cepErro && <div style={{ fontSize: 10, color: "#f87171", marginTop: 4 }}>{cepErro}</div>}
        {cepOk && <div style={{ fontSize: 10, color: "#4ade80", marginTop: 4 }}>✓ Endereço preenchido automaticamente no checkout</div>}
      </div>

      {/* Opções de frete */}
      {opcoes.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {opcoes.map(opt => {
            // Frete grátis: só mostrar se atingiu o mínimo
            if (opt.id === "gratis" && opt.minValue && cartTotal < opt.minValue) return null;
            const sel = freteEscolhido?.id === opt.id;
            return (
              <div key={opt.id} onClick={() => setFreteEscolhido(sel ? null : opt)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: sel ? "rgba(139,44,44,.18)" : "#1a1410", border: `1px solid ${sel ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 8, cursor: "pointer", transition: "all .2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{opt.icon || "📦"}</span>
                  <div>
                    <div style={{ fontSize: 13, color: "#f5f0e8", fontWeight: sel ? "bold" : "normal" }}>{opt.nome}</div>
                    <div style={{ fontSize: 10, color: "#6ade80" }}>⏱ {opt.prazo}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, color: opt.base === 0 ? "#4ade80" : "#e8b4b4", fontWeight: "bold" }}>
                    {opt.base === 0 ? "GRÁTIS" : fmt(opt.base)}
                  </div>
                  {sel && <div style={{ fontSize: 9, color: "#8b2c2c", letterSpacing: 1 }}>● SELECIONADO</div>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ fontSize: 11, color: "#5a4a4a", padding: "10px 0" }}>
          Configure as opções de frete no ADM → Frete.
        </div>
      )}
    </div>
  );
};

// ── BannerEditor — edição completa de banner promocional ──────────────────────
const ACCENT_PRESETS = ["#fbbf24","#e8b4b4","#60a5fa","#4ade80","#c084fc","#f87171","#fb923c","#ffffff"];
const BannerEditor = ({ banner, banners, setBanners, showToast, saveBanners }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...banner });

  const upd = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const save = () => {
    const next = banners.map(b => b.id === form.id ? form : b);
    saveBanners(next);
    showToast("✅ Banner salvo e publicado na home!");
    setOpen(false);
  };

  const toggleActive = () => {
    const next = banners.map(b => b.id === banner.id ? { ...b, active: !b.active } : b);
    saveBanners(next);
    showToast(banner.active ? "Banner desativado." : "✅ Banner ativado na home!");
  };

  const inp = (label, field, placeholder, full) => (
    <div key={field} style={full ? { gridColumn:"1/-1" } : {}}>
      <label style={{ display:"block", fontSize:9, letterSpacing:2, color:"#5a4a4a", textTransform:"uppercase", marginBottom:4 }}>{label}</label>
      <input value={form[field] || ""} onChange={e => upd(field, e.target.value)} placeholder={placeholder}
        style={{ width:"100%", background:"#0c0a09", border:"1px solid #2a1f1f", borderRadius:4, padding:"8px 10px", color:"#f5f0e8", fontSize:13, fontFamily:"Georgia,serif" }} />
    </div>
  );

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ background:"linear-gradient(145deg,#1a1410,#120e0c)", border:`1px solid ${form.active ? "#3a2a1a" : "#2a1f1f"}`, borderRadius:12, overflow:"hidden" }}>
      {/* Preview */}
      <div style={{ background: form.img ? `url(${form.img}) center/cover` : form.bg, padding:"18px 22px", position:"relative", minHeight:80 }}>
        {form.img && <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.45)" }} />}
        <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ flex:1 }}>
            <span style={{ fontSize:8, letterSpacing:2, padding:"2px 8px", border:`1px solid ${form.accent}60`, color:form.accent, borderRadius:2, textTransform:"uppercase" }}>{form.tag}</span>
            <div style={{ fontSize:15, color:"#f5f0e8", fontWeight:"bold", marginTop:6 }}>{form.title}</div>
            <div style={{ fontSize:11, color:"#a09080", marginTop:3 }}>{form.subtitle}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:7, alignItems:"flex-end", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ fontSize:10, color: form.active ? "#4ade80" : "#5a4a4a" }}>{form.active ? "● Ativo" : "○ Inativo"}</span>
              <button onClick={toggleActive}
                style={{ padding:"4px 10px", background: form.active ? "#7f1d1d" : "#1a3a1a", border:"none", borderRadius:4, color: form.active ? "#fca5a5" : "#4ade80", cursor:"pointer", fontSize:10, fontFamily:"Georgia,serif" }}>
                {form.active ? "Desativar" : "Ativar"}
              </button>
              <button onClick={() => setOpen(p => !p)}
                style={{ padding:"4px 10px", background:"rgba(139,44,44,.3)", border:"1px solid #8b2c2c", borderRadius:4, color:"#e8b4b4", cursor:"pointer", fontSize:10, fontFamily:"Georgia,serif" }}>
                ✏️ Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info rápida */}
      {!open && (
        <div style={{ padding:"10px 16px", display:"flex", gap:16, flexWrap:"wrap", fontSize:10, color:"#5a4a4a" }}>
          <span>CTA: <strong style={{ color:"#a09080" }}>{form.cta}</strong></span>
          <span>Filtro: <strong style={{ color:"#a09080" }}>{form.targetFilter || "Sem filtro"}</strong></span>
          <span>Cor: <strong style={{ color:form.accent }}>{form.accent}</strong></span>
          {form.img && <span style={{ color:"#4ade80" }}>🖼 Com imagem</span>}
        </div>
      )}

      {/* Formulário de edição */}
      {open && (
        <div style={{ padding:"18px 20px", borderTop:"1px solid #2a1f1f" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            {inp("Tag (ex: PROMOÇÃO)", "tag", "PROMOÇÃO", false)}
            {inp("Texto do botão CTA", "cta", "Ver Ofertas", false)}
            {inp("Título", "title", "Semana do Champagne", true)}
            {inp("Subtítulo", "subtitle", "Espumantes com até 20% OFF", true)}
            <div>
              <label style={{ display:"block", fontSize:9, letterSpacing:2, color:"#5a4a4a", textTransform:"uppercase", marginBottom:4 }}>Filtro ao clicar</label>
              <select value={form.targetFilter || ""} onChange={e => upd("targetFilter", e.target.value || null)}
                style={{ width:"100%", background:"#0c0a09", border:"1px solid #2a1f1f", borderRadius:4, padding:"8px 10px", color:"#f5f0e8", fontSize:13, fontFamily:"Georgia,serif" }}>
                <option value="">Sem filtro</option>
                {["Tinto","Branco","Espumante","Rosé"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:"block", fontSize:9, letterSpacing:2, color:"#5a4a4a", textTransform:"uppercase", marginBottom:4 }}>Cor de destaque</label>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {ACCENT_PRESETS.map(c => (
                  <div key={c} onClick={() => upd("accent", c)}
                    style={{ width:22, height:22, borderRadius:"50%", background:c, cursor:"pointer", border:`2px solid ${form.accent === c ? "#fff" : "transparent"}`, transition:"all .2s" }} />
                ))}
                <input type="color" value={form.accent} onChange={e => upd("accent", e.target.value)}
                  style={{ width:22, height:22, borderRadius:"50%", border:"none", padding:0, cursor:"pointer", background:"none" }} title="Cor personalizada" />
              </div>
            </div>
          </div>

          {/* Imagem de fundo do banner */}
          <div style={{ marginBottom:14, background:"#0c0a09", border:"1px solid #2a1f1f", borderRadius:8, padding:12 }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#5a4a4a", textTransform:"uppercase", marginBottom:8 }}>🖼 Imagem de Fundo (opcional)</div>
            {form.img ? (
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                <img src={form.img} alt="preview" loading="lazy" decoding="async" style={{ width:80, height:40, objectFit:"cover", borderRadius:4, border:"1px solid #3a2a2a" }} />
                <button onClick={() => upd("img", null)}
                  style={{ padding:"4px 10px", background:"none", border:"1px solid #3a1f1f", color:"#ef4444", borderRadius:4, cursor:"pointer", fontSize:10, fontFamily:"Georgia,serif" }}>
                  🗑 Remover
                </button>
                <span style={{ fontSize:9, color:"#4ade80" }}>✓ Imagem carregada</span>
              </div>
            ) : (
              <div style={{ fontSize:9, color:"#3a2a2a", marginBottom:8 }}>Sem imagem — usa o gradiente de cor configurado.</div>
            )}
            <input type="file" accept="image/*" id={`bannerImg_${banner.id}`} style={{ display:"none" }}
              onChange={e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => upd("img", ev.target.result); r.readAsDataURL(f); e.target.value=""; }} />
            <button onClick={() => document.getElementById(`bannerImg_${banner.id}`).click()}
              style={{ padding:"7px 14px", background:"#1a1410", border:"1px solid #3a2f2f", color:"#e8b4b4", borderRadius:4, cursor:"pointer", fontSize:10, fontFamily:"Georgia,serif" }}>
              📷 Enviar Imagem
            </button>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={save}
              style={{ padding:"9px 22px", background:"#8b2c2c", border:"none", borderRadius:4, color:"#fff", cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif", letterSpacing:1 }}>
              💾 Salvar Banner
            </button>
            <button onClick={() => { setForm({...banner}); setOpen(false); }}
              style={{ padding:"9px 14px", background:"none", border:"1px solid #2a1f1f", borderRadius:4, color:"#5a4a4a", cursor:"pointer", fontSize:11, fontFamily:"Georgia,serif" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
// ─── Painel Supabase (componente próprio para evitar hook em IIFE) ────────────
const SupabasePanel = ({ supaCfg, supaConnected, supaStatus, testSupaConnection, loadFromSupabase, showToast }) => {
  const [inputUrl, setInputUrl] = useState(supaCfg?.url || "");
  const [inputKey, setInputKey] = useState(supaCfg?.key || "");
  const [showKey, setShowKey] = useState(false);
  const SQL_SCHEMA = `create table if not exists wines (
  id bigint generated always as identity primary key,
  name text not null, origin text, region text, year int,
  cost_price numeric default 0, price numeric not null, promo_price numeric,
  stock int default 0, category text default 'Tinto',
  alcohol text, grapes text, description text, img text,
  keywords text default '', harmonization text default '',
  rating numeric default 4.5, sales int default 0,
  created_at timestamptz default now()
);
create table if not exists orders (
  id bigint generated always as identity primary key,
  customer text, cpf text, contact text, address text,
  items text, total numeric, coupon text,
  status text default 'Aguardando', date text,
  created_at timestamptz default now()
);
create table if not exists customers (
  id bigint generated always as identity primary key,
  name text, email text unique, phone text,
  created_at timestamptz default now()
);
create table if not exists reviews (
  id bigint generated always as identity primary key,
  wine_id bigint references wines(id) on delete cascade,
  author text, rating int, comment text,
  approved boolean default false, date text,
  created_at timestamptz default now()
);
alter table wines     enable row level security;
alter table orders    enable row level security;
alter table customers enable row level security;
alter table reviews   enable row level security;
create policy "public read wines"     on wines     for select using (true);
create policy "public insert wines"   on wines     for insert with check (true);
create policy "public update wines"   on wines     for update using (true);
create policy "public delete wines"   on wines     for delete using (true);
create policy "public insert orders"  on orders    for insert with check (true);
create policy "public read orders"    on orders    for select using (true);
create policy "public insert reviews" on reviews   for insert with check (true);
create policy "public read reviews"   on reviews   for select using (true);
create policy "public update reviews" on reviews   for update using (true);
create policy "public delete reviews" on reviews   for delete using (true);`;

  const SQL_STORAGE = `-- Cole no SQL Editor do Supabase para criar o bucket de imagens:
insert into storage.buckets (id, name, public)
values ('wines', 'wines', true)
on conflict (id) do nothing;

create policy "public upload wines storage"
on storage.objects for insert
with check (bucket_id = 'wines');

create policy "public read wines storage"
on storage.objects for select
using (bucket_id = 'wines');

create policy "public delete wines storage"
on storage.objects for delete
using (bucket_id = 'wines');`;
  const copySQL = () => { navigator.clipboard?.writeText(SQL_SCHEMA); showToast("SQL copiado! Cole no Editor SQL do Supabase."); };
  const copyStorageSQL = () => { navigator.clipboard?.writeText(SQL_STORAGE); showToast("SQL do Storage copiado!"); };
  const card = { background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22, marginBottom: 18 };
  const inputStyle = { width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 12, fontFamily: "monospace" };
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ maxWidth: 660 }}>
      <h1 style={{ fontSize: 21, marginBottom: 5 }}>🗄️ Banco de Dados — Supabase</h1>
      <p style={{ color: "#7a6a6a", fontSize: 11, marginBottom: 16 }}>Conecte o Vinhos9 ao Supabase para persistir produtos, pedidos e avaliações.</p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, marginBottom: 22,
        background: supaConnected ? "rgba(74,222,128,.1)" : supaStatus === "cors" ? "rgba(251,191,36,.1)" : supaStatus === "error" ? "rgba(248,113,113,.1)" : "#1a1410",
        border: `1px solid ${supaConnected ? "#4ade80" : supaStatus === "cors" ? "#fbbf24" : supaStatus === "error" ? "#f87171" : "#2a1f1f"}` }}>
        <span style={{ fontSize: 8 }}>●</span>
        <span style={{ fontSize: 11, color: supaConnected ? "#4ade80" : supaStatus === "cors" ? "#fbbf24" : supaStatus === "error" ? "#f87171" : "#7a6a6a" }}>
          {supaConnected ? "Conectado ao Supabase ✓" : supaStatus === "testing" ? "Testando conexão…" : supaStatus === "cors" ? "✓ Credenciais salvas — ativo após publicar" : supaStatus === "error" ? "Falha na conexão" : "Não conectado — usando dados locais"}
        </span>
      </div>
      <div style={card}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 12 }}>Passo 1 — Criar as tabelas no Supabase</div>
        <p style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.7, marginBottom: 12 }}>Vá em <strong style={{ color: "#e8b4b4" }}>SQL Editor → New Query</strong>, cole e clique <strong style={{ color: "#e8b4b4" }}>Run</strong>.</p>
        <div style={{ background: "#0c0a09", borderRadius: 6, padding: "10px 14px", fontSize: 10, color: "#4a4a4a", fontFamily: "monospace", maxHeight: 120, overflowY: "auto", marginBottom: 12, lineHeight: 1.6 }}>
          {SQL_SCHEMA.split("\n").slice(0, 8).join("\n")}<span style={{ color: "#2a2a2a" }}>{"\n"}…</span>
        </div>
        <button onClick={copySQL} style={{ padding: "8px 18px", background: "#1a1410", border: "1px solid #3a2f2f", color: "#e8b4b4", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>📋 Copiar SQL completo</button>
      </div>
      <div style={card}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 12 }}>Passo 1b — Criar bucket de imagens (Storage)</div>
        <p style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.7, marginBottom: 12 }}>
          Necessário para salvar fotos dos vinhos. Cole no <strong style={{ color: "#e8b4b4" }}>SQL Editor</strong> e clique <strong style={{ color: "#e8b4b4" }}>Run</strong>.
        </p>
        <div style={{ background: "#0c0a09", borderRadius: 6, padding: "10px 14px", fontSize: 10, color: "#4a4a4a", fontFamily: "monospace", maxHeight: 100, overflowY: "auto", marginBottom: 12, lineHeight: 1.6 }}>
          {SQL_STORAGE.split("\n").slice(0, 5).join("\n")}<span style={{ color: "#2a2a2a" }}>{"\n"}…</span>
        </div>
        <button onClick={copyStorageSQL} style={{ padding: "8px 18px", background: "#1a1410", border: "1px solid #3a2f2f", color: "#e8b4b4", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>🖼 Copiar SQL do Storage</button>
      </div>
      <div style={card}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 12 }}>Passo 2 — Conectar o projeto</div>
        <p style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.7, marginBottom: 14 }}>Vá em <strong style={{ color: "#e8b4b4" }}>Settings → API</strong> e copie a <strong style={{ color: "#e8b4b4" }}>Project URL</strong> e a <strong style={{ color: "#e8b4b4" }}>Publishable key</strong>.</p>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Project URL</label>
          <input value={inputUrl} onChange={e => setInputUrl(e.target.value)} placeholder="https://xxxxxxxxxxx.supabase.co" style={inputStyle} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Publishable Key</label>
          <div style={{ position: "relative" }}>
            <input type={showKey ? "text" : "password"} value={inputKey} onChange={e => setInputKey(e.target.value)} placeholder="sb_publishable_…" style={{ ...inputStyle, paddingRight: 40 }} />
            <button onClick={() => setShowKey(p => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 13 }}>{showKey ? "🙈" : "👁"}</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => testSupaConnection(inputUrl, inputKey)} disabled={!inputUrl || !inputKey || supaStatus === "testing"}
            style={{ padding: "11px 24px", background: supaStatus === "testing" ? "#2a1f1f" : "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1 }}>
            {supaStatus === "testing" ? "⏳ Testando…" : "🔌 Conectar e Sincronizar"}
          </button>
          {supaConnected && <button onClick={() => loadFromSupabase(supaCfg)} style={{ padding: "11px 18px", background: "#1a3a1a", border: "1px solid #4ade80", borderRadius: 4, color: "#4ade80", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>🔄 Recarregar</button>}
        </div>
        {supaStatus === "cors" && (
          <div style={{ marginTop: 12, padding: "12px 14px", background: "rgba(251,191,36,.07)", border: "1px solid rgba(251,191,36,.25)", borderRadius: 6, fontSize: 12, color: "#fbbf24", lineHeight: 1.7 }}>
            ⚠️ <strong>Credenciais salvas com sucesso!</strong><br/>
            O Claude.ai bloqueia conexões externas por segurança. O Supabase vai funcionar normalmente assim que você <strong>publicar o site no Vercel ou Netlify</strong>. Os dados ficam em modo local até lá.
          </div>
        )}
        {supaStatus === "error" && (
          <div style={{ marginTop: 12, padding: "12px 14px", background: "rgba(248,113,113,.07)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 6, fontSize: 12, color: "#f87171", lineHeight: 1.7 }}>
            ❌ Falha na conexão. Verifique a URL e a chave <strong>anon legacy</strong> (começa com <code>eyJ</code>).
          </div>
        )}
      </div>
      <div style={{ ...card, marginBottom: 0 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 12 }}>📖 Como criar sua conta Supabase (grátis)</div>
        {[["1","Acesse supabase.com e clique em Start your project"],["2","Crie conta com GitHub ou e-mail"],["3","New Project → nome (vinhos9) → senha → região São Paulo"],["4","Aguarde ~2 min o banco ser criado"],["5","SQL Editor → cole o SQL do Passo 1 → Run"],["6","Settings → API → copie Project URL e Publishable key"],["7","Cole acima no Passo 2 → Conectar"]].map(([n,t]) => (
          <div key={n} style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 12, color: "#7a6a6a" }}>
            <span style={{ background: "#8b2c2c", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}>{n}</span>
            <span>{t}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(74,222,128,.05)", border: "1px solid rgba(74,222,128,.15)", borderRadius: 6, fontSize: 11, color: "#4ade80" }}>✅ Plano gratuito: 500MB de banco, suficiente para começar.</div>
      </div>
    </div>
  );
};

// ─── Painel Cupons ────────────────────────────────────────────────────────────
const CuponsPanel = ({ customCoupons, saveCoupons, showToast }) => {
  const [newCode, setNewCode] = useState("");
  const [newPct, setNewPct] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const addCoupon = () => {
    const code = newCode.toUpperCase().trim();
    if (!code || !newPct || +newPct <= 0 || +newPct > 100) return showToast("Preencha código e percentual válido.", "error");
    saveCoupons({ ...customCoupons, [code]: { pct: +newPct, limit: newLimit ? +newLimit : null, uses: 0 } });
    setNewCode(""); setNewPct(""); setNewLimit(""); showToast(`Cupom ${code} criado! ✅`);
  };
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, marginBottom: 5 }}>🎁 Gerenciar Cupons</h1>
      <p style={{ color: "#7a6a6a", fontSize: 13, marginBottom: 24 }}>Crie e remova cupons de desconto para seus clientes.</p>
      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22, marginBottom: 20 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 16 }}>Criar Novo Cupom</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Código</label>
            <input value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())} placeholder="Ex: NATAL20"
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#fbbf24", fontSize: 14, fontFamily: "monospace", letterSpacing: 2, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Desconto (%)</label>
            <input type="number" value={newPct} onChange={e => setNewPct(e.target.value)} placeholder="Ex: 15" min="1" max="100"
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#4ade80", fontSize: 14, fontFamily: "Georgia,serif", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Limite de usos</label>
            <input type="number" value={newLimit} onChange={e => setNewLimit(e.target.value)} placeholder="∞ Ilimitado" min="1"
              style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#60a5fa", fontSize: 14, fontFamily: "Georgia,serif", boxSizing: "border-box" }} />
          </div>
          <button onClick={addCoupon} style={{ padding: "10px 18px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif", whiteSpace: "nowrap" }}>+ Adicionar</button>
        </div>
        <p style={{ fontSize: 11, color: "#3a2a2a", marginTop: 8 }}>Deixe "Limite de usos" vazio para cupom ilimitado.</p>
      </div>
      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 16 }}>Cupons Ativos ({Object.keys(customCoupons).length})</div>
        {Object.entries(customCoupons).map(([code, data]) => {
          const pct = typeof data === "object" ? data.pct : data;
          const limit = typeof data === "object" ? data.limit : null;
          const uses = typeof data === "object" ? (data.uses || 0) : 0;
          const esgotado = limit != null && uses >= limit;
          return (
            <div key={code} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #1a1410", opacity: esgotado ? 0.5 : 1 }}>
              <div style={{ background: "#120e0c", border: `1px dashed ${esgotado ? "#5a4a4a" : "#8b2c2c"}`, borderRadius: 6, padding: "6px 16px", minWidth: 110 }}>
                <span style={{ fontSize: 14, letterSpacing: 3, color: esgotado ? "#5a4a4a" : "#fbbf24", fontWeight: "bold" }}>{code}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, color: "#4ade80", fontWeight: "bold" }}>{pct}% OFF</div>
                <div style={{ fontSize: 11, color: "#5a4a4a", marginTop: 2 }}>
                  {limit == null
                    ? <span style={{ color: "#3a5a3a" }}>∞ Ilimitado</span>
                    : <span style={{ color: esgotado ? "#ef4444" : "#60a5fa" }}>{uses}/{limit} usos {esgotado ? "— Esgotado" : `— ${limit - uses} restantes`}</span>
                  }
                </div>
              </div>
              {/* Resetar usos */}
              {uses > 0 && (
                <button onClick={() => { saveCoupons({ ...customCoupons, [code]: { pct, limit, uses: 0 } }); showToast(`Usos de ${code} resetados.`); }}
                  style={{ background: "none", border: "1px solid #1a2a3a", color: "#60a5fa", padding: "5px 10px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>↺ Reset</button>
              )}
              <button onClick={() => { const u = { ...customCoupons }; delete u[code]; saveCoupons(u); showToast(`Cupom ${code} removido.`, "error"); }}
                style={{ background: "none", border: "1px solid #3a1f1f", color: "#ef4444", padding: "5px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>🗑 Remover</button>
            </div>
          );
        })}
        {Object.keys(customCoupons).length === 0 && <p style={{ fontSize: 13, color: "#3a2a2a" }}>Nenhum cupom criado ainda.</p>}
      </div>
    </div>
  );
};

// ── Sub-componente card de API de frete ──────────────────────────────────────
const FreteAPICard = ({ logo, title, color, badge, badgeColor, storageKey, fields, docs, descricao, exemplo, showToast }) => {
  const [vals, setVals] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  const [open, setOpen] = useState(false);
  const [showEx, setShowEx] = useState(false);
  const saved = Object.values(vals).some(v => v && v.trim().length > 4);
  const salvar = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(vals)); } catch {}
    showToast(`✅ Credenciais ${title} salvas!`);
  };
  const limpar = () => {
    setVals({});
    try { localStorage.removeItem(storageKey); } catch {}
    showToast(`🗑 Credenciais ${title} removidas.`, "error");
  };
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ background:"linear-gradient(145deg,#1a1410,#120e0c)", border:`1px solid ${open ? color+"55" : "#2a1f1f"}`, borderRadius:10, padding:20, marginBottom:16, transition:"border .2s" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer" }} onClick={() => setOpen(p=>!p)}>
        <div style={{ fontSize:28 }}>{logo}</div>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:16, color:"#f5f0e8", fontWeight:"bold" }}>{title}</span>
            <span style={{ fontSize:9, letterSpacing:1, background:badgeColor+"22", color:badgeColor, border:`1px solid ${badgeColor}44`, borderRadius:99, padding:"2px 8px", textTransform:"uppercase" }}>{badge}</span>
            {saved && <span style={{ fontSize:9, letterSpacing:1, background:"#4ade8022", color:"#4ade80", border:"1px solid #4ade8044", borderRadius:99, padding:"2px 8px" }}>✅ CONFIGURADO</span>}
          </div>
          <div style={{ fontSize:11, color:"#5a4a4a", marginTop:3 }}>{descricao}</div>
        </div>
        <span style={{ color:"#5a4a4a", fontSize:18 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ marginTop:18, borderTop:"1px solid #2a1f1f", paddingTop:18 }}>
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:11, color:"#5a4a4a", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>{f.label}</label>
              <input
                value={vals[f.key] || ""}
                onChange={e => setVals(p => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                style={{ width:"100%", background:"#0c0a09", border:"1px solid #2a1f1f", borderRadius:4, padding:"9px 11px", color:"#f5f0e8", fontSize:13, fontFamily:"monospace", boxSizing:"border-box" }}
              />
            </div>
          ))}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:16 }}>
            <button onClick={salvar} style={{ padding:"8px 18px", background:"#8b2c2c", border:"none", borderRadius:4, color:"#fff", cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif" }}>💾 Salvar credenciais</button>
            {saved && <button onClick={limpar} style={{ padding:"8px 14px", background:"none", border:"1px solid #3a1f1f", borderRadius:4, color:"#ef4444", cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif" }}>🗑 Limpar</button>}
            <a href={docs} target="_blank" rel="noreferrer" style={{ padding:"8px 14px", background:"none", border:`1px solid ${color}44`, borderRadius:4, color:color, cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif", textDecoration:"none" }}>📖 Documentação oficial ↗</a>
          </div>
          <button onClick={() => setShowEx(p=>!p)} style={{ background:"none", border:"none", color:"#5a4a4a", cursor:"pointer", fontSize:11, padding:0, fontFamily:"monospace", marginBottom: showEx ? 10 : 0 }}>
            {showEx ? "▲ Ocultar" : "▶ Ver"} exemplo de código
          </button>
          {showEx && (
            <pre style={{ background:"#0a0807", border:"1px solid #1a1310", borderRadius:6, padding:14, fontSize:11, color:"#a09080", overflowX:"auto", lineHeight:1.7, fontFamily:"monospace", whiteSpace:"pre-wrap", wordBreak:"break-all" }}>
              {exemplo}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Painel Frete ─────────────────────────────────────────────────────────────
const FretePanel = ({ freteConfig, saveFreteConfig, showToast }) => {
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ id: "", nome: "", icon: "📦", prazo: "", base: "", minValue: "" });
  const opcoes = freteConfig.opcoes || [];
  const startEdit = (op) => { setEditando(op.id); setForm({ ...op, base: String(op.base), minValue: op.minValue != null ? String(op.minValue) : "" }); };
  const saveEdit = () => {
    const updated = opcoes.map(o => o.id === editando ? { ...form, base: +form.base || 0, minValue: form.minValue !== "" ? +form.minValue : undefined } : o);
    saveFreteConfig({ opcoes: updated }); setEditando(null); showToast("Frete atualizado! ✅");
  };
  const addOpcao = () => {
    const nova = { id: `frete_${Date.now()}`, nome: "Nova Opção", icon: "🚚", prazo: "7 dias úteis", base: 0 };
    const newOpcoes = [...opcoes, nova];
    saveFreteConfig({ opcoes: newOpcoes });
    setEditando(nova.id);
    setForm({ ...nova, base: "0", minValue: "" });
  };
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontSize: 24, marginBottom: 5 }}>🚚 Configurar Frete</h1>
      <p style={{ color: "#7a6a6a", fontSize: 13, marginBottom: 24 }}>Gerencie as opções de entrega exibidas aos clientes.</p>
      {opcoes.map(op => (
        <div key={op.id} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: `1px solid ${editando === op.id ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 10, padding: 20, marginBottom: 14 }}>
          {editando === op.id ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["nome","Nome (ex: PAC)"],["icon","Ícone (emoji)"],["prazo","Prazo (ex: 5 dias úteis)"],["base","Preço base (R$)"]].map(([f, l]) => (
                <div key={f}>
                  <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>{l}</label>
                  <input value={form[f] ?? ""} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                    style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 14, fontFamily: "Georgia,serif", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Valor mínimo para frete grátis (R$) — deixe vazio se não aplicar</label>
                <input type="number" value={form.minValue ?? ""} onChange={e => setForm(p => ({ ...p, minValue: e.target.value }))}
                  style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#fbbf24", fontSize: 14, fontFamily: "Georgia,serif", boxSizing: "border-box" }} />
              </div>
              <div style={{ gridColumn: "1/-1", display: "flex", gap: 10 }}>
                <button onClick={saveEdit} style={{ padding: "9px 20px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif" }}>💾 Salvar</button>
                <button onClick={() => setEditando(null)} style={{ padding: "9px 16px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: "#7a6a6a", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif" }}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 28 }}>{op.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, color: "#f5f0e8", fontWeight: "bold" }}>{op.nome}</div>
                <div style={{ fontSize: 12, color: "#7a6a6a" }}>{op.prazo} · {+op.base === 0 ? <span style={{ color: "#4ade80" }}>Grátis</span> : `R$ ${(+op.base).toFixed(2)} base`}{op.minValue ? ` · Grátis acima de R$ ${op.minValue}` : ""}</div>
              </div>
              <button onClick={() => startEdit(op)} style={{ background: "none", border: "1px solid #2a3a2a", color: "#4ade80", padding: "6px 14px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>✏️ Editar</button>
              <button onClick={() => { saveFreteConfig({ opcoes: opcoes.filter(o => o.id !== op.id) }); showToast("Opção removida.", "error"); }}
                style={{ background: "none", border: "1px solid #3a1f1f", color: "#ef4444", padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>🗑</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={addOpcao} style={{ marginTop: 8, padding: "10px 22px", background: "#1a1410", border: "1px solid #3a2f2f", borderRadius: 4, color: "#e8b4b4", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif" }}>+ Adicionar opção de frete</button>

      {/* ── APIs de Frete ── */}
      <div style={{ marginTop: 36 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 4 }}>🔌 Integração com APIs de Frete</div>
        <p style={{ fontSize: 12, color: "#5a4a4a", marginBottom: 20, lineHeight: 1.7 }}>
          Para calcular frete em tempo real, integre uma das APIs abaixo. Salve seus tokens aqui para referência — a implementação no checkout utilizará esses dados.
        </p>

        {/* Melhor Envio */}
        <FreteAPICard
          logo="📦" title="Melhor Envio" color="#f97316"
          badge="Recomendado" badgeColor="#f97316"
          storageKey="v9_melhorenvio_token"
          fields={[{ key: "token", label: "Token de Acesso (Bearer)", placeholder: "eyJ0eXAiOiJKV1QiLCJhbGci..." }]}
          docs="https://docs.melhorenvio.com.br"
          descricao="Agrega PAC, Sedex, Jadlog, Azul Cargo e outros em uma única requisição. Retorna cotações com prazo e preço em tempo real."
          exemplo={`// Exemplo de cotação — Melhor Envio\nconst resp = await fetch("https://melhorenvio.com.br/api/v2/me/shipment/calculate", {\n  method: "POST",\n  headers: {\n    "Accept": "application/json",\n    "Content-Type": "application/json",\n    "Authorization": "Bearer SEU_TOKEN",\n    "User-Agent": "Vinhos9 (contato@vinhos9.com.br)"\n  },\n  body: JSON.stringify({\n    from: { postal_code: "01310100" },  // CEP da loja\n    to:   { postal_code: cepCliente },\n    package: { height:30, width:30, length:30, weight:1.5 },\n    options: { receipt:false, own_hand:false },\n    services: ["1","2","3","7","8"]  // PAC, Sedex, Mini...\n  })\n});\nconst cotacoes = await resp.json();`}
          showToast={showToast}
        />

        {/* Correios */}
        <FreteAPICard
          logo="🏛️" title="Correios — API Oficial" color="#fbbf24"
          badge="Oficial" badgeColor="#4ade80"
          storageKey="v9_correios_token"
          fields={[
            { key: "usuario", label: "Usuário / CNPJ do contrato", placeholder: "12345678000199" },
            { key: "senha",   label: "Senha do contrato Correios", placeholder: "••••••••" },
            { key: "codigoEmpresa", label: "Código da empresa (opcional)", placeholder: "0000000000" },
          ]}
          docs="https://www.correios.com.br/atendimento/developers"
          descricao="API REST dos Correios (novo portal). Requer contrato corporativo ativo. Retorna PAC, Sedex e variantes com preço e prazo oficial."
          exemplo={`// Exemplo — Correios API REST v2\n// 1. Autenticar\nconst auth = await fetch("https://api.correios.com.br/token/v1/autentica/cartaopostagem", {\n  method: "POST",\n  headers: {\n    "Authorization": "Basic " + btoa(usuario + ":" + senha),\n    "Content-Type": "application/json"\n  }\n});\nconst { token } = await auth.json();\n\n// 2. Calcular frete\nconst preco = await fetch(\n  "https://api.correios.com.br/preco/v1/nacional/04510?" +\n  new URLSearchParams({ cepOrigem:"01310100", cepDestino:cepCliente, peso:"1500", comprimento:"30", altura:"15", largura:"20" }),\n  { headers: { "Authorization": "Bearer " + token } }\n);\nconst resultado = await preco.json();`}
          showToast={showToast}
        />
      </div>
    </div>
  );
};

// ── Painel Redes Sociais ─────────────────────────────────────────────────────
const SocialPanel = ({ showToast }) => {
  const redes = [
    {
      key: "facebook",
      logo: "🔵", title: "Facebook & Instagram (Meta)", color: "#1877f2",
      badge: "Meta Business", badgeColor: "#1877f2",
      storageKey: "v9_meta_token",
      apis: [
        { nome: "Meta Pixel (Facebook Pixel)", desc: "Rastreia conversões, adicionar ao carrinho e pageviews para campanhas no Facebook/Instagram Ads.", link: "https://developers.facebook.com/docs/facebook-pixel", tipo: "Script — sem token de API", codigo: "<!-- Insira no <head> do site -->\n<script>\n  !function(f,b,e,v,n,t,s) {\n    if(f.fbq) return; n=f.fbq=function() {\n      n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)\n    };\n    if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';\n    n.queue=[]; t=b.createElement(e); t.async=!0;\n    t.src=v; s=b.getElementsByTagName(e)[0];\n    s.parentNode.insertBefore(t,s)\n  }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');\n  fbq('init', 'SEU_PIXEL_ID');\n  fbq('track', 'PageView');\n<" + "/script>" },
        { nome: "Conversions API (CAPI)", desc: "Envia eventos de servidor para o Meta, complementando o Pixel para maior precisão em conversões.", link: "https://developers.facebook.com/docs/marketing-api/conversions-api", tipo: "REST API — Token de acesso necessário", codigo: `// Evento de compra via Conversions API\nconst resp = await fetch(\n  "https://graph.facebook.com/v19.0/SEU_PIXEL_ID/events",\n  {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({\n      data: [{\n        event_name: "Purchase",\n        event_time: Math.floor(Date.now() / 1000),\n        user_data: { em: hashSHA256(email), ph: hashSHA256(telefone) },\n        custom_data: { value: totalPedido, currency: "BRL" }\n      }],\n      access_token: "SEU_TOKEN_META"\n    })\n  }\n);` },
        { nome: "Meta Graph API — Catálogo de Produtos", desc: "Sobe o catálogo de vinhos automaticamente para usar em anúncios dinâmicos no Facebook e Instagram.", link: "https://developers.facebook.com/docs/marketing-api/catalog", tipo: "REST API — Token com permissão catalog_management", codigo: `// Enviar produto ao catálogo Meta\nconst resp = await fetch(\n  "https://graph.facebook.com/v19.0/SEU_CATALOG_ID/products",\n  {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({\n      access_token: "SEU_TOKEN_META",\n      requests: [{\n        method: "CREATE",\n        data: {\n          id: wine.id,\n          name: wine.name,\n          price: (wine.price * 100) + " BRL",  // em centavos\n          url: "https://vinhos9.com.br/vinho/" + wine.id,\n          image_url: wine.image,\n          availability: wine.stock > 0 ? "in stock" : "out of stock",\n          condition: "new",\n          description: wine.description\n        }\n      }]\n    })\n  }\n);` },
      ],
      fields: [
        { key: "pixelId", label: "Pixel ID", placeholder: "123456789012345" },
        { key: "accessToken", label: "Token de Acesso (Meta Business)", placeholder: "EAABsbCS..." },
        { key: "catalogId", label: "ID do Catálogo (opcional)", placeholder: "987654321" },
      ],
      dica: "Crie o Pixel e os tokens no Meta Business Suite → Configurações → Origens de dados."
    },
    {
      key: "instagram",
      logo: "📸", title: "Instagram Shopping", color: "#e1306c",
      badge: "Meta Commerce", badgeColor: "#e1306c",
      storageKey: "v9_instagram_token",
      apis: [
        { nome: "Instagram Basic Display API", desc: "Exibe seu feed de fotos do Instagram dentro do site, mostrando posts reais da loja.", link: "https://developers.facebook.com/docs/instagram-basic-display-api", tipo: "OAuth — Token de usuário Instagram", codigo: `// Buscar últimas fotos do Instagram\nconst resp = await fetch(\n  "https://graph.instagram.com/me/media?" +\n  "fields=id,caption,media_type,media_url,thumbnail_url,permalink&" +\n  "access_token=" + SEU_TOKEN_INSTAGRAM\n);\nconst { data } = await resp.json();\n// data = array de posts com url, legenda, link` },
        { nome: "Instagram Graph API — Publicação", desc: "Publica posts e reels automaticamente no Instagram da loja a partir do painel ADM.", link: "https://developers.facebook.com/docs/instagram-api/guides/content-publishing", tipo: "REST API — Token com permissão instagram_content_publish", codigo: `// Publicar imagem no Instagram\n// Passo 1: criar container\nconst container = await fetch(\n  "https://graph.facebook.com/v19.0/SEU_IG_USER_ID/media",\n  {\n    method: "POST",\n    body: new URLSearchParams({\n      image_url: "https://seusite.com/imagem.jpg",\n      caption: "🍷 Novo vinho disponível! #vinho #wine",\n      access_token: SEU_TOKEN\n    })\n  }\n);\nconst { id } = await container.json();\n\n// Passo 2: publicar\nawait fetch(\n  "https://graph.facebook.com/v19.0/SEU_IG_USER_ID/media_publish",\n  { method: "POST", body: new URLSearchParams({ creation_id: id, access_token: SEU_TOKEN }) }\n);` },
      ],
      fields: [
        { key: "igUserId", label: "Instagram User ID (numérico)", placeholder: "17841400123456789" },
        { key: "accessToken", label: "Token de Acesso Instagram", placeholder: "IGQVJWe..." },
      ],
      dica: "Use o Facebook for Developers → Criar App → Tipo: Consumer → adicionar Instagram Basic Display."
    },
    {
      key: "tiktok",
      logo: "🎵", title: "TikTok for Business", color: "#ff0050",
      badge: "TikTok API", badgeColor: "#ff0050",
      storageKey: "v9_tiktok_token",
      apis: [
        { nome: "TikTok Pixel", desc: "Rastreia eventos de visita, carrinho e compra para otimização de campanhas de anúncios no TikTok Ads.", link: "https://ads.tiktok.com/marketing_api/docs?id=1739583652957185", tipo: "Script — sem token de API", codigo: "<!-- Insira no <head> do site -->\n<script>\n  !function (w, d, t) {\n    w.TiktokAnalyticsObject=t; var ttq=w[t]=w[t]||[];\n    ttq.methods=[\"page\",\"track\",\"identify\",\"instances\"];\n    ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}\n    for(var i=0;i<ttq.methods.length;i++) ttq.setAndDefer(ttq,ttq.methods[i]);\n    var s=d.createElement(\"script\"); s.type=\"text/javascript\"; s.async=!0;\n    s.src=\"https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=SEU_PIXEL_ID\";\n    d.getElementsByTagName(\"head\")[0].appendChild(s);\n  }(window, document, 'ttq');\n  ttq.page();\n<" + "/script>" },
        { nome: "TikTok Events API (Server-Side)", desc: "Versão server-side do Pixel, mais precisa. Envia eventos de compra diretamente do backend.", link: "https://ads.tiktok.com/marketing_api/docs?id=1741601162187777", tipo: "REST API — Access Token TikTok for Business", codigo: `// Evento de compra — TikTok Events API\nconst resp = await fetch(\n  "https://business-api.tiktok.com/open_api/v1.3/event/track/",\n  {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Access-Token": "SEU_ACCESS_TOKEN"\n    },\n    body: JSON.stringify({\n      pixel_code: "SEU_PIXEL_CODE",\n      event: "CompletePayment",\n      timestamp: new Date().toISOString(),\n      properties: {\n        currency: "BRL",\n        value: totalPedido,\n        contents: [{ content_id: wine.id, content_type: "product", quantity: 1 }]\n      }\n    })\n  }\n);` },
        { nome: "TikTok Catalog API — Produtos", desc: "Sincroniza o catálogo de vinhos com o TikTok Shop para exibição em vídeos e anúncios de shopping.", link: "https://ads.tiktok.com/marketing_api/docs?id=1740306481704961", tipo: "REST API — Access Token com permissão de catálogo", codigo: `// Adicionar produto ao catálogo TikTok\nconst resp = await fetch(\n  "https://business-api.tiktok.com/open_api/v1.3/catalog/product/upload/",\n  {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Access-Token": "SEU_ACCESS_TOKEN"\n    },\n    body: JSON.stringify({\n      catalog_id: "SEU_CATALOG_ID",\n      products: [{\n        sku_id: wine.id,\n        title: wine.name,\n        description: wine.description,\n        availability: "in stock",\n        condition: "new",\n        price: wine.price + " BRL",\n        link: "https://vinhos9.com.br/vinho/" + wine.id,\n        image_link: wine.image\n      }]\n    })\n  }\n);` },
      ],
      fields: [
        { key: "pixelCode", label: "Pixel Code (TikTok Pixel ID)", placeholder: "C0XXXXXXXXXXXXXXXX" },
        { key: "accessToken", label: "Access Token (TikTok for Business)", placeholder: "xxxxxxxxxxxxxxxx..." },
        { key: "advertiser", label: "Advertiser ID", placeholder: "123456789012345" },
      ],
      dica: "Acesse ads.tiktok.com → Ativos → Eventos → Criar Pixel para obter seu Pixel Code e token."
    },
  ];

  const [openNet, setOpenNet] = useState(null);
  const [vals, setVals] = useState(() => {
    const out = {};
    redes.forEach(r => {
      try { out[r.key] = JSON.parse(localStorage.getItem(r.storageKey) || "{}"); } catch { out[r.key] = {}; }
    });
    return out;
  });
  const [showCode, setShowCode] = useState({});

  const salvar = (rede) => {
    try { localStorage.setItem(rede.storageKey, JSON.stringify(vals[rede.key] || {})); } catch {}
    showToast(`✅ Configurações ${rede.title} salvas!`);
  };
  const limpar = (rede) => {
    setVals(p => ({ ...p, [rede.key]: {} }));
    try { localStorage.removeItem(rede.storageKey); } catch {}
    showToast(`🗑 Configurações ${rede.title} removidas.`, "error");
  };

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ maxWidth: 760 }}>
      <h1 style={{ fontSize: 24, marginBottom: 5 }}>📱 Redes Sociais & APIs</h1>
      <p style={{ color: "#7a6a6a", fontSize: 13, marginBottom: 8, lineHeight: 1.7 }}>
        Configure integrações com Facebook, Instagram e TikTok. Salve seus tokens e IDs aqui para referência — use os exemplos de código para implementar no checkout e páginas do site.
      </p>
      <div style={{ background: "linear-gradient(135deg,#0e1200,#0a0e00)", border: "1px solid #2a3a1a", borderRadius: 8, padding: "10px 16px", marginBottom: 24, fontSize: 12, color: "#a0b060", lineHeight: 1.7 }}>
        💡 <strong>Dica:</strong> As APIs abaixo são integrações externas. Os tokens e IDs salvos aqui ficam apenas no seu navegador (localStorage). Para produção, mova as chaves secretas para variáveis de ambiente no servidor.
      </div>

      {redes.map(rede => {
        const isSaved = Object.values(vals[rede.key] || {}).some(v => v && v.trim().length > 4);
        const isOpen = openNet === rede.key;
        return (
          <div key={rede.key} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: `1px solid ${isOpen ? rede.color + "55" : "#2a1f1f"}`, borderRadius: 12, padding: 22, marginBottom: 18, transition: "border .25s" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => setOpenNet(isOpen ? null : rede.key)}>
              <div style={{ fontSize: 30 }}>{rede.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 16, color: "#f5f0e8", fontWeight: "bold" }}>{rede.title}</span>
                  <span style={{ fontSize: 9, letterSpacing: 1, background: rede.badgeColor + "22", color: rede.badgeColor, border: `1px solid ${rede.badgeColor}44`, borderRadius: 99, padding: "2px 8px", textTransform: "uppercase" }}>{rede.badge}</span>
                  {isSaved && <span style={{ fontSize: 9, letterSpacing: 1, background: "#4ade8022", color: "#4ade80", border: "1px solid #4ade8044", borderRadius: 99, padding: "2px 8px" }}>✅ CONFIGURADO</span>}
                </div>
                <div style={{ fontSize: 11, color: "#5a4a4a", marginTop: 2 }}>{rede.apis.length} APIs disponíveis · clique para expandir</div>
              </div>
              <span style={{ color: "#5a4a4a", fontSize: 18 }}>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div style={{ marginTop: 20, borderTop: "1px solid #2a1f1f", paddingTop: 20 }}>

                {/* APIs disponíveis */}
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>APIs disponíveis</div>
                {rede.apis.map((api, i) => (
                  <div key={i} style={{ background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: "#f5f0e8", fontWeight: "bold", marginBottom: 3 }}>{api.nome}</div>
                        <div style={{ fontSize: 11, color: "#7a6a6a", marginBottom: 6, lineHeight: 1.6 }}>{api.desc}</div>
                        <div style={{ fontSize: 10, color: rede.color, background: rede.color + "11", border: `1px solid ${rede.color}22`, borderRadius: 4, display: "inline-block", padding: "2px 8px" }}>{api.tipo}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                        <button
                          onClick={() => setShowCode(p => ({ ...p, [rede.key + i]: !p[rede.key + i] }))}
                          style={{ padding: "5px 12px", background: "none", border: "1px solid #3a2f2f", borderRadius: 4, color: "#9a8a8a", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                          {showCode[rede.key + i] ? "▲ Código" : "▶ Ver código"}
                        </button>
                        <a href={api.link} target="_blank" rel="noreferrer"
                          style={{ padding: "5px 12px", background: "none", border: `1px solid ${rede.color}44`, borderRadius: 4, color: rede.color, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif", textDecoration: "none" }}>
                          📖 Docs ↗
                        </a>
                      </div>
                    </div>
                    {showCode[rede.key + i] && (
                      <pre style={{ marginTop: 12, background: "#070605", border: "1px solid #1a1310", borderRadius: 6, padding: 14, fontSize: 10, color: "#a09080", overflowX: "auto", lineHeight: 1.7, fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                        {api.codigo}
                      </pre>
                    )}
                  </div>
                ))}

                {/* Campos de configuração */}
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14, marginTop: 22 }}>Salvar credenciais</div>
                <div style={{ background: "linear-gradient(135deg,#0a0e1a,#080a12)", border: "1px solid #1a1f3a", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: "#6a80b0", lineHeight: 1.7 }}>
                  🔒 {rede.dica}
                </div>
                {rede.fields.map(f => (
                  <div key={f.key} style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>{f.label}</label>
                    <input
                      value={(vals[rede.key] || {})[f.key] || ""}
                      onChange={e => setVals(p => ({ ...p, [rede.key]: { ...(p[rede.key] || {}), [f.key]: e.target.value } }))}
                      placeholder={f.placeholder}
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "monospace", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={() => salvar(rede)} style={{ padding: "9px 20px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>💾 Salvar</button>
                  {isSaved && <button onClick={() => limpar(rede)} style={{ padding: "9px 14px", background: "none", border: "1px solid #3a1f1f", borderRadius: 4, color: "#ef4444", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>🗑 Limpar</button>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Painel CSV com IA ────────────────────────────────────────────────────────
const CSVPanel = ({ importCSV, showToast }) => {
  const csvRef = useRef(null);
  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 21, marginBottom: 5 }}>📥 Importar CSV</h1>
      <p style={{ color: "#7a6a6a", fontSize: 12, marginBottom: 20, lineHeight: 1.7 }}>
        Importe vinhos em massa via arquivo CSV. Baixe o modelo abaixo para ver o formato correto.
      </p>
      <input type="file" accept=".csv" ref={csvRef} style={{ display: "none" }} onChange={e => { const f = e.target.files[0]; if (f) importCSV(f); }} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={() => csvRef.current?.click()} style={{ padding: "11px 24px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif", letterSpacing: 1 }}>📂 Selecionar CSV</button>
        <button onClick={() => {
          const h = "name,origin,region,year,costPrice,price,promoPrice,stock,category,alcohol,grapes,description,keywords,harmonization,rating,sales\n";
          const b = new Blob([h], { type: "text/csv" });
          const u = URL.createObjectURL(b);
          const a = document.createElement("a"); a.href = u; a.download = "modelo-vinhos.csv"; a.click();
          URL.revokeObjectURL(u);
        }} style={{ padding: "11px 24px", background: "#1a1410", border: "1px solid #3a2f2f", borderRadius: 4, color: "#e8b4b4", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif" }}>⬇ Baixar Modelo CSV</button>
      </div>
      <div style={{ marginTop: 20, background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 8, padding: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 12 }}>Colunas do CSV</div>
        {[
          ["name",          "Título SEO",           "Ex: Vinho Tinto Chileno Reserva Cabernet Sauvignon 2021"],
          ["description",   "Descrição curta",       "Linguagem popular: Ex: Vinho encorpado, ótimo pra churrasco, gosto de frutas vermelhas"],
          ["origin",        "País de Origem",        "Ex: Chile, Argentina, Brasil"],
          ["region",        "Região",                "Ex: Valle Central, Mendoza"],
          ["year",          "Safra",                 "Ex: 2022"],
          ["price",         "Preço de venda (R$)",   "Ex: 89.90"],
          ["costPrice",     "Custo (R$)",            "Ex: 45.00 — opcional, só para controle interno"],
          ["promoPrice",    "Preço promocional (R$)","Ex: 69.90 — deixe vazio se não tiver promoção"],
          ["stock",         "Estoque",               "Ex: 10"],
          ["category",      "Categoria",             "Tinto, Branco, Espumante ou Rosé"],
          ["alcohol",       "Teor alcoólico",        "Ex: 13.5%"],
          ["grapes",        "Uvas",                  "Ex: Cabernet Sauvignon, Merlot"],
          ["keywords",      "Palavras-chave SEO",    "Ex: vinho tinto, cabernet, presente — separadas por ;"],
          ["harmonization", "Harmonização",          "Ex: Carnes vermelhas, Churrasco — separadas por ,"],
          ["rating",        "Avaliação",             "Ex: 4.5"],
          ["sales",         "Vendas",                "Ex: 0"],
        ].map(([col, label, ex]) => (
          <div key={col} style={{ display: "grid", gridTemplateColumns: "110px 140px 1fr", gap: 8, marginBottom: 8, fontSize: 11, alignItems: "center" }}>
            <span style={{ color: "#c084fc", fontFamily: "monospace" }}>{col}</span>
            <span style={{ color: "#e8b4b4", fontWeight: "bold" }}>{label}</span>
            <span style={{ color: "#5a4a4a" }}>{ex}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// ─── Painel Segurança (componente próprio para evitar hook em IIFE) ───────────
// ─── Painel Galeria de Imagens ────────────────────────────────────────────────
const GaleriaPanel = ({ supaCfg, wines, setWines, supaFetch, showToast }) => {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    if (!supaCfg) { setLoading(false); return; }
    try {
      const c = supaCfg;
      const r = await fetch(`${c.url}/storage/v1/object/list/wines`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": c.key, "Authorization": `Bearer ${c.key}` },
        body: JSON.stringify({ prefix: "", limit: 200, offset: 0 })
      });
      const data = await r.json();
      if (Array.isArray(data)) {
        const list = data.filter(f => f.name && !f.name.endsWith("/")).map(f => ({
          name: f.name,
          url: `${c.url}/storage/v1/object/public/wines/${f.name}`,
          size: f.metadata?.size || 0,
        }));
        setImgs(list.map(img => {
          const wine = wines.find(w => w.img && w.img.includes(img.name));
          return { ...img, wine };
        }));
      } else { setImgs([]); }
    } catch { setImgs([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (img) => {
    if (!confirm(`Deletar imagem "${img.name}"?\n${img.wine ? `⚠️ Associada ao vinho: ${img.wine.name}` : "Não está associada a nenhum vinho."}`)) return;
    setDeleting(img.name);
    try {
      const c = supaCfg;
      const r = await fetch(`${c.url}/storage/v1/object/wines/${img.name}`, {
        method: "DELETE",
        headers: { "apikey": c.key, "Authorization": `Bearer ${c.key}` }
      });
      if (r.ok) {
        if (img.wine) {
          await supaFetch("wines", "PATCH", { img: null }, `id=eq.${img.wine.id}`, supaCfg);
          setWines(prev => prev.map(w => w.id === img.wine.id ? { ...w, img: null } : w));
        }
        setImgs(prev => prev.filter(i => i.name !== img.name));
        showToast("Imagem deletada! ✅");
      } else { showToast("Erro ao deletar imagem.", "error"); }
    } catch { showToast("Erro ao deletar imagem.", "error"); }
    setDeleting(null);
  };

  const fmtSize = (b) => b > 1024*1024 ? `${(b/1024/1024).toFixed(1)} MB` : `${Math.round(b/1024)} KB`;

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, marginBottom: 4 }}>🖼 Galeria de Imagens</h1>
          <p style={{ color: "#7a6a6a", fontSize: 13 }}>{loading ? "Carregando…" : `${imgs.length} imagem${imgs.length !== 1 ? "s" : ""} no Supabase Storage`}</p>
        </div>
        <button onClick={load} style={{ padding: "8px 16px", background: "#1a1410", border: "1px solid #3a2f2f", borderRadius: 4, color: "#a09080", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif" }}>🔄 Recarregar</button>
      </div>
      {!supaCfg && <div style={{ padding: 20, background: "rgba(139,44,44,.08)", border: "1px solid rgba(139,44,44,.3)", borderRadius: 8, color: "#8b6060", fontSize: 13 }}>⚠️ Configure o Supabase primeiro na aba Banco de Dados.</div>}
      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
          {[...Array(6)].map((_, i) => <div key={i} style={{ background: "#1a1410", borderRadius: 10, height: 220 }} />)}
        </div>
      )}
      {!loading && imgs.length === 0 && supaCfg && (
        <div style={{ textAlign: "center", padding: 60, color: "#3a2a2a", fontSize: 14 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🖼</div>
          Nenhuma imagem no Storage.<br />
          <span style={{ fontSize: 12 }}>Cadastre vinhos com foto para vê-las aqui.</span>
        </div>
      )}
      {!loading && imgs.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
          {imgs.map(img => (
            <div key={img.name} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, overflow: "hidden", transition: "border-color .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#8b2c2c"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#2a1f1f"}>
              <div style={{ position: "relative", width: "100%", height: 160, background: "#0c0a09", overflow: "hidden" }}>
                <img src={img.url} alt={img.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                {img.wine && <div style={{ position: "absolute", top: 6, left: 6, background: "rgba(139,44,44,.85)", borderRadius: 4, padding: "2px 7px", fontSize: 10, color: "#fff" }}>🍷 Vinculada</div>}
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 11, color: "#7a6a6a", marginBottom: 4, wordBreak: "break-all", lineHeight: 1.4 }}>{img.name}</div>
                {img.wine && <div style={{ fontSize: 11, color: "#e8b4b4", marginBottom: 4 }}>📦 {img.wine.name.slice(0, 22)}{img.wine.name.length > 22 ? "…" : ""}</div>}
                {img.size > 0 && <div style={{ fontSize: 10, color: "#3a2a2a", marginBottom: 8 }}>{fmtSize(img.size)}</div>}
                <div style={{ display: "flex", gap: 6 }}>
                  <a href={img.url} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", padding: "6px", background: "#1a2a3a", border: "1px solid #2a3a4a", borderRadius: 4, color: "#60a5fa", fontSize: 11, textDecoration: "none", fontFamily: "Georgia,serif" }}>🔗 Ver</a>
                  <button onClick={() => handleDelete(img)} disabled={deleting === img.name}
                    style={{ flex: 1, padding: "6px", background: deleting === img.name ? "#1a1410" : "#2a1010", border: "1px solid #3a1f1f", borderRadius: 4, color: deleting === img.name ? "#5a4a4a" : "#ef4444", cursor: deleting === img.name ? "not-allowed" : "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                    {deleting === img.name ? "⏳" : "🗑 Del"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── EmailJS utility ──────────────────────────────────────────────────────────
const getEmailConfig = () => { try { const s = localStorage.getItem("v9_emailjs"); return s ? JSON.parse(s) : null; } catch { return null; } };

const sendEmail = async (templateId, params) => {
  const cfg = getEmailConfig();
  if (!cfg?.serviceId || !cfg?.publicKey) return false;
  const tid = cfg.templates?.[templateId] || "";
  if (!tid) return false;
  try {
    const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: cfg.serviceId,
        template_id: tid,
        user_id: cfg.publicKey,
        accessToken: cfg.publicKey,
        template_params: params
      })
    });
    if (!r.ok) {
      const txt = await r.text().catch(() => r.status);
      console.error("EmailJS error:", r.status, txt);
    }
    return r.ok;
  } catch (e) { console.error("EmailJS fetch error:", e); return false; }
};

// ─── Painel E-mails ───────────────────────────────────────────────────────────
const EmailPanel = ({ showToast }) => {
  const [cfg, setCfg] = useState(() => getEmailConfig() || { serviceId: "", publicKey: "", templates: { boasVindas: "", pedidoConfirmado: "", pedidoTransito: "", pedidoEntregue: "", resetSenha: "" } });
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(null);
  const [testEmail, setTestEmail] = useState("");

  const save = () => { try { localStorage.setItem("v9_emailjs", JSON.stringify(cfg)); setSaved(true); setTimeout(() => setSaved(false), 2000); showToast("Configurações de e-mail salvas! ✅"); } catch {} };

  const testSend = async (templateKey) => {
    if (!testEmail) return showToast("Informe um e-mail para teste.", "error");
    if (!cfg.serviceId || !cfg.publicKey) return showToast("Salve o Service ID e a Public Key primeiro.", "error");
    const tid = cfg.templates?.[templateKey];
    if (!tid) return showToast("Preencha o Template ID deste e-mail primeiro.", "error");
    setTesting(templateKey);
    const params = {
      to_email: testEmail, to_name: "Cliente Teste",
      store_name: "Vinhos9", order_id: "#0001",
      order_items: "Vinho Tinto Reserva × 1", order_total: "R$ 149,90",
      order_date: new Date().toLocaleDateString("pt-BR"),
      points_earned: "149", points_total: "349",
      reset_link: window.location.origin + "?reset=true",
      coupon_code: "BEMVINDO",
    };
    // Chama diretamente para pegar erro detalhado
    try {
      const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: cfg.serviceId, template_id: tid, user_id: cfg.publicKey, accessToken: cfg.publicKey, template_params: params })
      });
      if (r.ok) {
        showToast(`✅ E-mail de teste enviado para ${testEmail}!`);
      } else {
        const txt = await r.text().catch(() => `HTTP ${r.status}`);
        showToast(`Erro ${r.status}: ${txt}`, "error");
      }
    } catch (e) {
      showToast(`Erro de conexão: ${e.message}`, "error");
    }
    setTesting(null);
  };

  const TEMPLATES = [
    { key: "boasVindas",       icon: "🎉", label: "Boas-vindas",           desc: "Enviado ao criar conta. Inclui cupom BEMVINDO.", vars: "to_email, to_name, store_name, coupon_code" },
    { key: "pedidoConfirmado", icon: "✅", label: "Pedido Confirmado",      desc: "Enviado ao finalizar a compra.", vars: "to_email, to_name, order_id, order_items, order_total, order_date, points_earned, points_total" },
    { key: "pedidoTransito",   icon: "🚚", label: "Pedido em Trânsito",     desc: "Enviado quando status muda para Em trânsito.", vars: "to_email, to_name, order_id, order_date" },
    { key: "pedidoEntregue",   icon: "📦", label: "Pedido Entregue",        desc: "Enviado quando status muda para Entregue.", vars: "to_email, to_name, order_id, order_total, points_earned" },
    { key: "resetSenha",       icon: "🔑", label: "Redefinição de Senha",   desc: "Enviado ao solicitar nova senha.", vars: "to_email, to_name, reset_link" },
  ];

  const inp = (label, field, placeholder) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>{label}</label>
      <input value={cfg[field] || ""} onChange={e => setCfg(p => ({ ...p, [field]: e.target.value }))} placeholder={placeholder}
        style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "monospace", boxSizing: "border-box" }} />
    </div>
  );

  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontSize: 24, marginBottom: 5 }}>📧 Configurar E-mails Automáticos</h1>
      <p style={{ color: "#7a6a6a", fontSize: 13, marginBottom: 24, lineHeight: 1.7 }}>
        Use o <a href="https://www.emailjs.com" target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}>EmailJS</a> para enviar e-mails automáticos sem servidor. Gratuito até 200 e-mails/mês.
      </p>

      {/* Guia de configuração */}
      <div style={{ background: "rgba(96,165,250,.06)", border: "1px solid rgba(96,165,250,.2)", borderRadius: 10, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, color: "#60a5fa", textTransform: "uppercase", marginBottom: 12 }}>📋 Como configurar o EmailJS</div>
        {[
          ["1", "Acesse emailjs.com e crie uma conta gratuita"],
          ["2", "Vá em Email Services → Add New Service → escolha Gmail ou outro"],
          ["3", "Copie o Service ID e cole abaixo"],
          ["4", "Vá em Email Templates → Create New Template para cada tipo de e-mail"],
          ["5", "No template use as variáveis listadas (ex: {{to_name}}, {{order_id}})"],
          ["6", "Copie o Template ID de cada um e cole nos campos abaixo"],
          ["7", "Em Account → API Keys copie a Public Key"],
        ].map(([n, text]) => (
          <div key={n} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ background: "#1a2a3a", color: "#60a5fa", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>{n}</span>
            <span style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.6 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Credenciais */}
      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22, marginBottom: 20 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 16 }}>🔑 Credenciais EmailJS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {inp("Service ID", "serviceId", "service_xxxxxxx")}
          {inp("Public Key", "publicKey", "xxxxxxxxxxxxxxxxxxxxxx")}
        </div>
        {/* E-mail de teste */}
        <div style={{ marginTop: 4, marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 11, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>E-mail para teste</label>
          <input value={testEmail} onChange={e => setTestEmail(e.target.value)} placeholder="seu@email.com"
            style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", boxSizing: "border-box" }} />
        </div>
        <button onClick={save}
          style={{ padding: "10px 24px", background: saved ? "#1a3a1a" : "#8b2c2c", border: "none", borderRadius: 4, color: saved ? "#4ade80" : "#fff", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif", letterSpacing: 1, transition: "all .3s" }}>
          {saved ? "✅ Salvo!" : "💾 Salvar Credenciais"}
        </button>
      </div>

      {/* Templates */}
      <div style={{ fontSize: 12, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 16 }}>📨 Templates de E-mail</div>
      {TEMPLATES.map(({ key, icon, label, desc, vars }) => (
        <div key={key} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 20, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 14, color: "#f5f0e8", marginBottom: 4 }}>{icon} {label}</div>
              <div style={{ fontSize: 11, color: "#5a4a4a", marginBottom: 6 }}>{desc}</div>
              <div style={{ fontSize: 10, color: "#3a2a3a", background: "#1a0e1a", borderRadius: 4, padding: "4px 8px", fontFamily: "monospace" }}>
                Variáveis: {vars}
              </div>
            </div>
            <button onClick={() => testSend(key)} disabled={testing === key || !cfg.serviceId || !cfg.publicKey}
              style={{ padding: "7px 14px", background: testing === key ? "#2a1f2a" : "#1a1a2a", border: "1px solid #3a3a5a", borderRadius: 4, color: testing === key ? "#5a4a5a" : "#a0a0e8", cursor: testing === key ? "not-allowed" : "pointer", fontSize: 11, fontFamily: "Georgia,serif", whiteSpace: "nowrap" }}>
              {testing === key ? "⏳ Enviando…" : "🧪 Testar"}
            </button>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 10, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Template ID</label>
            <input value={cfg.templates?.[key] || ""} onChange={e => setCfg(p => ({ ...p, templates: { ...p.templates, [key]: e.target.value } }))} placeholder="template_xxxxxxx"
              style={{ width: "100%", background: "#0c0a09", border: `1px solid ${cfg.templates?.[key] ? "#2a3a2a" : "#2a1f1f"}`, borderRadius: 4, padding: "9px 12px", color: cfg.templates?.[key] ? "#4ade80" : "#7a6a6a", fontSize: 13, fontFamily: "monospace", boxSizing: "border-box" }} />
          </div>
        </div>
      ))}
      <button onClick={save}
        style={{ width: "100%", padding: "12px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif", letterSpacing: 2, textTransform: "uppercase" }}>
        💾 Salvar Todas as Configurações
      </button>
    </div>
  );
};

// ── Modo Manutenção ──────────────────────────────────────────────────────────
const MAINTENANCE_KEY = "v9_maintenance";
const getMaintenance = () => { try { return JSON.parse(localStorage.getItem(MAINTENANCE_KEY) || "{}"); } catch { return {}; } };
const MaintenancePage = () => {
  const cfg = getMaintenance();
  // Manutenção: bloqueia clientes (admins com ?adm=1 passam)

  return (
    <div style={{ minHeight: "100vh", background: "#0a0605", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia,serif" }}>
      <div style={{ textAlign: "center", padding: "40px 24px", maxWidth: 500 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🍷</div>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 10 }}>Vinhos9</div>
        <h1 style={{ fontSize: 26, color: "#f5f0e8", marginBottom: 12, lineHeight: 1.3 }}>{cfg.titulo || "Site em Manutenção"}</h1>
        <p style={{ fontSize: 14, color: "#7a6a6a", lineHeight: 1.7, marginBottom: 24 }}>{cfg.mensagem || "Estamos realizando melhorias para você. Voltamos em breve!"}</p>
        {cfg.previsao && <div style={{ display: "inline-block", background: "rgba(139,44,44,.2)", border: "1px solid #3a1f1f", borderRadius: 8, padding: "8px 20px", fontSize: 12, color: "#e8b4b4" }}>⏱ Previsão: {cfg.previsao}</div>}
        {cfg.email && <div style={{ marginTop: 16, fontSize: 11, color: "#5a4a4a" }}>Dúvidas? <a href={`mailto:${cfg.email}`} style={{ color: "#e8b4b4" }}>{cfg.email}</a></div>}
      </div>
    </div>
  );
};

const SegurancaPanel = ({ showToast, maintenanceCfg = {}, saveMaintenance = () => {} }) => {
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [secMsg, setSecMsg] = useState(null);
  const [showNewPass, setShowNewPass] = useState(false);
  const passStrength = (p) => {
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++; if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++; if (/[0-9]/.test(p)) score++; if (/[^a-zA-Z0-9]/.test(p)) score++;
    if (score <= 1) return { label: "Fraca", color: "#f87171" };
    if (score <= 3) return { label: "Média", color: "#fbbf24" };
    return { label: "Forte", color: "#4ade80" };
  };
  const strength = passStrength(newPass);
  const handleSave = () => {
    if (!newUser.trim() || newUser.length < 4) { setSecMsg({ type: "error", text: "Usuário deve ter ao menos 4 caracteres." }); return; }
    if (newPass.length < 8) { setSecMsg({ type: "error", text: "Senha deve ter ao menos 8 caracteres." }); return; }
    if (newPass !== newPassConfirm) { setSecMsg({ type: "error", text: "As senhas não coincidem." }); return; }
    if (strength?.label === "Fraca") { setSecMsg({ type: "error", text: "Escolha uma senha mais forte." }); return; }
    saveAdmHash(newUser.trim(), newPass);
    setNewUser(""); setNewPass(""); setNewPassConfirm("");
    setSecMsg({ type: "success", text: "✅ Credenciais atualizadas! Use-as no próximo login." });
  };
  const inputStyle = { width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" };
  return (
    <div style={{ maxWidth: 480 }}>
      <h1 style={{ fontSize: 21, marginBottom: 5 }}>🔐 Segurança</h1>
      <p style={{ color: "#7a6a6a", fontSize: 11, marginBottom: 24 }}>Altere as credenciais de acesso ao painel administrativo.</p>
      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 24, marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 18 }}>Alterar Credenciais do ADM</div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Novo Usuário</label>
          <input value={newUser} onChange={e => setNewUser(e.target.value)} placeholder="Mínimo 4 caracteres" style={inputStyle} />
        </div>
        <div style={{ marginBottom: 6 }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Nova Senha</label>
          <div style={{ position: "relative" }}>
            <input type={showNewPass ? "text" : "password"} value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Mínimo 8 caracteres" style={{ ...inputStyle, paddingRight: 40 }} />
            <button onClick={() => setShowNewPass(p => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 13 }}>{showNewPass ? "🙈" : "👁"}</button>
          </div>
          {strength && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <div style={{ flex: 1, height: 4, background: "#1a1410", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: strength.label === "Fraca" ? "33%" : strength.label === "Média" ? "66%" : "100%", height: "100%", background: strength.color, transition: "width .3s" }} />
              </div>
              <span style={{ fontSize: 10, color: strength.color }}>{strength.label}</span>
            </div>
          )}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Confirmar Nova Senha</label>
          <input type="password" value={newPassConfirm} onChange={e => setNewPassConfirm(e.target.value)} placeholder="Repita a senha"
            style={{ ...inputStyle, border: `1px solid ${newPassConfirm && newPassConfirm !== newPass ? "#f87171" : "#2a1f1f"}` }} />
          {newPassConfirm && newPassConfirm !== newPass && <div style={{ fontSize: 10, color: "#f87171", marginTop: 4 }}>As senhas não coincidem</div>}
        </div>
        {secMsg && <div style={{ marginBottom: 14, padding: "10px 14px", background: secMsg.type === "success" ? "rgba(74,222,128,.07)" : "rgba(248,113,113,.07)", border: `1px solid ${secMsg.type === "success" ? "rgba(74,222,128,.2)" : "rgba(248,113,113,.2)"}`, borderRadius: 6, fontSize: 12, color: secMsg.type === "success" ? "#4ade80" : "#f87171" }}>{secMsg.text}</div>}
        <button onClick={handleSave} style={{ padding: "11px 24px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1 }}>💾 Salvar Credenciais</button>
      </div>
      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>Proteções Ativas</div>
        {[["✅","Senhas armazenadas como hash (não reversível)"],["✅","Bloqueio após 5 tentativas incorretas (60s)"],["✅","Chaves do gateway salvas localmente (não no código)"],["✅","Campos sanitizados contra XSS"],["✅","HTTPS obrigatório via Vercel/Netlify"],["⚠️","Backend real recomendado para produção com vendas"]].map(([icon, text]) => (
          <div key={text} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, color: icon === "⚠️" ? "#fbbf24" : "#7a6a6a" }}>
            <span>{icon}</span><span>{text}</span>
          </div>
        ))}
      </div>

      {/* ── Modo Manutenção ── */}
      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: `2px solid ${maintenanceCfg.ativo ? "#f97316" : "#2a1f1f"}`, borderRadius: 10, padding: 24, marginTop: 18, transition: "border .3s" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 4 }}>🚧 Modo Manutenção</div>
            <div style={{ fontSize: 12, color: "#5a4a4a", lineHeight: 1.5 }}>Exibe tela de manutenção para todos os visitantes. Você (ADM logado) continua acessando normalmente.</div>
          </div>
          {/* Toggle */}
          <div onClick={() => { const novo = { ...maintenanceCfg, ativo: !maintenanceCfg.ativo }; saveMaintenance(novo); showToast(novo.ativo ? "🚧 Modo manutenção ATIVADO!" : "✅ Site voltou ao ar!"); }}
            style={{ width: 52, height: 28, borderRadius: 99, background: maintenanceCfg.ativo ? "#f97316" : "#2a1f1f", border: `1px solid ${maintenanceCfg.ativo ? "#f97316" : "#3a2f2f"}`, cursor: "pointer", position: "relative", transition: "all .3s", flexShrink: 0 }}>
            <div style={{ position: "absolute", top: 3, left: maintenanceCfg.ativo ? 26 : 3, width: 20, height: 20, borderRadius: "50%", background: maintenanceCfg.ativo ? "#fff" : "#5a4a4a", transition: "left .3s" }} />
          </div>
        </div>
        {maintenanceCfg.ativo && (
          <div style={{ background: "rgba(249,115,22,.08)", border: "1px solid rgba(249,115,22,.25)", borderRadius: 6, padding: "8px 12px", marginBottom: 16, fontSize: 11, color: "#f97316" }}>
            ⚠️ Site em manutenção — clientes não conseguem acessar agora.
          </div>
        )}
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { key: "titulo", label: "Título da página", placeholder: "Site em Manutenção" },
            { key: "mensagem", label: "Mensagem para o cliente", placeholder: "Estamos realizando melhorias. Voltamos em breve!" },
            { key: "previsao", label: "Previsão de retorno (ex: 14/06 às 18h)", placeholder: "Hoje às 18h" },
            { key: "email", label: "E-mail de contato (opcional)", placeholder: "contato@vinhos9.com.br" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>{f.label}</label>
              <input
                value={maintenanceCfg[f.key] || ""}
                onChange={e => saveMaintenance({ ...maintenanceCfg, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", boxSizing: "border-box" }}
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 10, color: "#3a2f2f", lineHeight: 1.6 }}>
          💡 Para acessar o site em manutenção como admin, acesse: <span style={{ color: "#5a4a4a", fontFamily: "monospace" }}>vinhos9.com.br?adm=1</span>
        </div>
      </div>
    </div>
  );
};

// ── TrackingWidget — rastreamento de pedido ──────────────────────────────────
const TrackingWidget = () => {
  const [code, setCode] = useState("");
  const track = () => {
    if (!code.trim()) return;
    const c = code.trim().toUpperCase();
    // Correios
    if (/^[A-Z]{2}\d{9}[A-Z]{2}$/.test(c)) {
      window.open(`https://rastreamento.correios.com.br/app/index.php`, "_blank");
    } else {
      window.open(`https://www.linketrack.com/track/${c}`, "_blank");
    }
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === "Enter" && track()}
          placeholder="Ex: BR123456789BR ou NF-e 12345"
          style={{ flex: 1, background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
        <button onClick={track} style={{ padding: "10px 18px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif" }}>🔍 Rastrear</button>
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: "#5a4a4a", lineHeight: 1.7 }}>
        O código de rastreamento é enviado por e-mail após a confirmação do envio. Para dúvidas, entre em contato via{" "}
        <a href="https://wa.me/5542998493579" target="_blank" rel="noreferrer" style={{ color: "#4ade80" }}>WhatsApp</a>.
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState("store");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [wines, setWines] = useState(INITIAL_WINES);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [countryFilter, setCountryFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedWine, setSelectedWine] = useState(null);
  const [orders, setOrders] = useState(() => {
    // 19: Carrega pedidos do localStorage ao iniciar (fix: pedidos não apareciam no ADM)
    try {
      const local = JSON.parse(localStorage.getItem("v9_orders") || "[]");
      return local.length > 0 ? local : INITIAL_ORDERS;
    } catch { return INITIAL_ORDERS; }
  });
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [toast, setToast] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [banners, setBanners] = useState(() => {
    try { const s = localStorage.getItem("v9_banners"); return s ? JSON.parse(s) : INITIAL_BANNERS; } catch { return INITIAL_BANNERS; }
  });
  const saveBanners = (b) => { setBanners(b); try { localStorage.setItem("v9_banners", JSON.stringify(b)); } catch {} };

  const [highlightIds, setHighlightIds] = useState(() => {
    try { const s = localStorage.getItem("v9_highlights"); return s ? JSON.parse(s) : INITIAL_HIGHLIGHT_WINES; } catch { return INITIAL_HIGHLIGHT_WINES; }
  });
  const saveHighlights = (ids) => { setHighlightIds(ids); try { localStorage.setItem("v9_highlights", JSON.stringify(ids)); } catch {} };

  const [heroBanner, setHeroBanner] = useState(() => {
    try { const s = localStorage.getItem("v9_hero"); return s ? JSON.parse(s) : INITIAL_HERO_BANNER; } catch { return INITIAL_HERO_BANNER; }
  });
  const saveHero = (h) => { setHeroBanner(h); try { localStorage.setItem("v9_hero", JSON.stringify(h)); } catch {} };
  const [clientPanelOpen, setClientPanelOpen] = useState(false);
  const [clientPanelTab, setClientPanelTab] = useState("orders");
  const openClientPanel = (tab = "orders") => { setClientPanelTab(tab); setClientPanelOpen(true); };
  const [maintenanceCfg, setMaintenanceCfg] = useState(getMaintenance);
  const saveMaintenance = (cfg) => { setMaintenanceCfg(cfg); try { localStorage.setItem(MAINTENANCE_KEY, JSON.stringify(cfg)); } catch {} };
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  useEffect(() => {
    const shown = (() => { try { return localStorage.getItem("v9_popup_shown"); } catch { return null; } })();
    if (!shown) { const t = setTimeout(() => setShowWelcomePopup(true), 6000); return () => clearTimeout(t); }
  }, []);
  const [showPass, setShowPass] = useState(false);
  const [editWine, setEditWine] = useState(null);
  // 🎁 Cupons — agora editáveis
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [customCoupons, setCustomCoupons] = useState(() => {
    try {
      const s = localStorage.getItem("v9_coupons");
      if (s) {
        const parsed = JSON.parse(s);
        // migrar formato antigo { CODE: 10 } para novo { CODE: { pct, limit, uses } }
        const migrated = {};
        Object.entries(parsed).forEach(([k, v]) => {
          migrated[k] = typeof v === "object" ? v : { pct: v, limit: null, uses: 0 };
        });
        return migrated;
      }
    } catch {}
    return { "VINO10": { pct: 10, limit: null, uses: 0 }, "VINO20": { pct: 20, limit: null, uses: 0 }, "BEMVINDO": { pct: 5, limit: null, uses: 0 } };
  });
  const COUPONS = customCoupons;
  const saveCoupons = (c) => { setCustomCoupons(c); try { localStorage.setItem("v9_coupons", JSON.stringify(c)); } catch {} };
  // Helper para pegar % do cupom
  const couponPct = (code) => { const c = COUPONS[code]; return c ? (typeof c === "object" ? c.pct : c) : 0; };
  const couponValid = (code) => { const c = COUPONS[code]; if (!c) return false; if (typeof c !== "object") return true; return c.limit == null || c.uses < c.limit; };
  // 🚚 Frete configurável
  const [freteConfig, setFreteConfig] = useState(() => { try { const s = localStorage.getItem("v9_frete"); return s ? JSON.parse(s) : { opcoes: [{ id: "pac", nome: "PAC", icon: "📦", prazo: "5 dias úteis", base: 18 }, { id: "sedex", nome: "SEDEX", icon: "⚡", prazo: "2 dias úteis", base: 32 }, { id: "gratis", nome: "Frete Grátis", icon: "🎁", prazo: "7 dias úteis", base: 0, minValue: 500 }] }; } catch { return { opcoes: [] }; } });
  const saveFreteConfig = (cfg) => { setFreteConfig(cfg); try { localStorage.setItem("v9_frete", JSON.stringify(cfg)); } catch {} };
  // 📊 Visitas por produto
  const [wineVisits, setWineVisits] = useState(() => { try { const s = localStorage.getItem("v9_visits"); return s ? JSON.parse(s) : {}; } catch { return {}; } });
  const trackVisit = (wineId) => { setWineVisits(prev => { const n = { ...prev, [wineId]: (prev[wineId] || 0) + 1 }; try { localStorage.setItem("v9_visits", JSON.stringify(n)); } catch {} return n; }); };
  // 🔍 Filtro de preço
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [wishlist, setWishlist] = useState(() => { try { const s = localStorage.getItem("v9_wishlist_main"); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [zoomWine, setZoomWine] = useState(null);
  const [reviewedWines, setReviewedWines] = useState(new Set());
  const [catalogLoading, setCatalogLoading] = useState(false);
  // Estado para modais de info na página do produto (13-16)
  const [openInfoModal, setOpenInfoModal] = useState(null); // "termos"|"troca"|"garantia"|"pagamento"
  const [supaCfg, setSupaCfg] = useState(() => getSupaCfg());
  const [supaStatus, setSupaStatus] = useState("idle");
  const [supaConnected, setSupaConnected] = useState(false);
  const [dbLoading, setDbLoading] = useState(true);
  const [paymentGateway, setPaymentGateway] = useState(() => { try { return localStorage.getItem("v9_gw") || "mercadopago"; } catch { return "mercadopago"; } });
  const [paymentKeys, setPaymentKeys] = useState(() => { try { const s = localStorage.getItem("v9_keys"); return s ? JSON.parse(s) : {}; } catch { return {}; } });
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [exportMsg, setExportMsg] = useState("");
  // 3. Paginação ADM vinhos
  const WINES_PER_PAGE = 15;
  const [admWinePage, setAdmWinePage] = useState(1);
  // 💳 Descontos por forma de pagamento
  const [payDescontos, setPayDescontos] = useState(() => {
    try { return JSON.parse(localStorage.getItem("v9_pay_desc") || '{"pix":5,"boleto":3,"credito1x":0}'); } catch { return { pix:5, boleto:3, credito1x:0 }; }
  });
  const savePayDescontos = (d) => { setPayDescontos(d); try { localStorage.setItem("v9_pay_desc", JSON.stringify(d)); } catch {} };

  // 🔗 URL persistence — lê ?produto=ID ou ?vinho=slug e abre o produto correto (funciona com Supabase async)
  const pendingProductId = useRef((() => { try { const p = new URLSearchParams(window.location.search); return p.get("produto") || p.get("vinho"); } catch { return null; } })());

  // Gera slug amigável a partir do nome do vinho
  const toSlug = (wine) => {
    const name = (wine.name || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `${name}-${wine.id}`;
  };
  const slugToId = (slug) => {
    const parts = slug.split("-");
    return parts[parts.length - 1];
  };

  useEffect(() => {
    if (!pendingProductId.current || wines.length === 0) return;
    const pid = pendingProductId.current;
    // suporta tanto ID puro quanto slug-com-id no final
    const idFromSlug = slugToId(pid);
    const found = wines.find(w => String(w.id) === pid || String(w.id) === idFromSlug);
    if (found) {
      setSelectedWine(found);
      setPage("store");
      pendingProductId.current = null;
    }
  }, [wines]);

  useEffect(() => {
    if (selectedWine) {
      const url = new URL(window.location.href);
      url.searchParams.delete("produto");
      url.searchParams.set("vinho", toSlug(selectedWine));
      window.history.replaceState(null, "", url.toString());
      document.title = `${selectedWine.name} | Vinhos9`;
      trackVisit(selectedWine.id);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("produto");
      url.searchParams.delete("vinho");
      window.history.replaceState(null, "", url.toString());
    }
  }, [selectedWine]);

  // ── Supabase: carregar dados ao conectar ─────────────────────────────────
  const loadFromSupabase = useCallback(async (cfg) => {
    if (!cfg?.url || !cfg?.key) return;
    setDbLoading(true);
    const [winesData, ordersData, reviewsData] = await Promise.all([
      supa.wines.list(cfg),
      supa.orders.list(cfg),
      supa.reviews.list(cfg),
    ]);
    if (winesData && winesData !== "cors_blocked") {
      setWines(winesData.map(w => ({
        ...w,
        promoPrice: w.promo_price,
        costPrice: w.cost_price,
        description: w.description || "",
        keywords: w.keywords || "",
        harmonization: w.harmonization || "",
        img: w.img || getImgLocal(w.id) || null, // usa URL do Storage, fallback localStorage
      })));
      setSupaConnected(true);
    }
    if (Array.isArray(ordersData))  setOrders(ordersData);
    if (Array.isArray(reviewsData)) setReviews(reviewsData.map(r => ({ ...r, wineId: r.wine_id })));
    setDbLoading(false);
  }, []);

  useEffect(() => { if (supaCfg) loadFromSupabase(supaCfg); }, [supaCfg]);

  // ── Supabase: testar conexão ─────────────────────────────────────────────
  const testSupaConnection = async (url, key) => {
    setSupaStatus("testing");
    const cfg = { url: url.replace(/\/$/, ""), key };
    const result = await supa.wines.list(cfg);
    if (result === "cors_blocked") {
      // Credenciais salvas mesmo assim — vai funcionar quando publicado
      saveSupaCfg(url, key); setSupaCfg(cfg); setSupaStatus("cors");
    } else if (result !== null) {
      saveSupaCfg(url, key); setSupaCfg(cfg); setSupaStatus("ok"); loadFromSupabase(cfg);
    } else {
      setSupaStatus("error");
    }
  };

  // ── Supabase: wrapper para operações com fallback local ──────────────────
  // Salva imagem localmente como fallback
  const saveImgLocal = (id, img) => { try { if (img) localStorage.setItem(`v9_img_${id}`, img); } catch {} };
  const getImgLocal = (id) => { try { return localStorage.getItem(`v9_img_${id}`) || null; } catch { return null; } };
  const removeImgLocal = (id) => { try { localStorage.removeItem(`v9_img_${id}`); } catch {} };

  const dbAddWine = async (wine) => {
    if (!supaCfg) { showToast("Supabase não configurado.", "error"); return null; }

    // 1. Insere o vinho SEM imagem primeiro para obter o ID
    const w = {
      name: wine.name, origin: wine.origin || "", region: wine.region || "",
      year: wine.year ? +wine.year : null, cost_price: +wine.costPrice || 0,
      price: +wine.price, promo_price: wine.promoPrice ? +wine.promoPrice : null,
      stock: +wine.stock || 0, category: wine.category || "Tinto",
      alcohol: wine.alcohol || "", grapes: wine.grapes || "",
      description: wine.description || "", keywords: wine.keywords || "",
      harmonization: wine.harmonization || "", img: null, rating: 4.5, sales: 0,
    };
    const r = await supa.wines.insert(w, supaCfg);
    if (r === "cors_blocked") { showToast("CORS: só funciona após publicar no Vercel.", "error"); return null; }
    if (!r?.[0]) { showToast("Erro ao salvar no banco. Tente novamente.", "error"); return null; }

    const saved = { ...r[0], promoPrice: r[0].promo_price, costPrice: r[0].cost_price, keywords: r[0].keywords || "", harmonization: r[0].harmonization || "", img: null };

    // 2. Se tem imagem, faz upload para Storage e atualiza só o campo img
    if (wine.img) {
      showToast("Enviando imagem…");
      const imgUrl = await supaUploadImage(wine.img, saved.id, supaCfg);
      if (imgUrl) {
        // PATCH só o campo img usando filtro correto
        await supaFetch("wines", "PATCH", { img: imgUrl }, `id=eq.${saved.id}`, supaCfg);
        saved.img = imgUrl;
        showToast("Vinho e imagem salvos! ✅");
      } else {
        saveImgLocal(saved.id, wine.img);
        saved.img = wine.img;
        showToast("Vinho salvo! Imagem em modo local (verifique o bucket Storage).", "error");
      }
    }
    return saved;
  };

  const dbUpdateWine = async (wine) => {
    if (!supaCfg) return;
    let imgUrl = wine.img;

    if (wine.img && wine.img.startsWith("data:")) {
      const uploaded = await supaUploadImage(wine.img, wine.id, supaCfg);
      if (uploaded) { imgUrl = uploaded; removeImgLocal(wine.id); }
      else saveImgLocal(wine.id, wine.img);
    } else if (!wine.img) {
      removeImgLocal(wine.id);
    }

    // NUNCA enviar o campo 'id' no body do PATCH — Supabase rejeita
    const { id, ...rest } = wine;
    const w = {
      name: rest.name, origin: rest.origin || "", region: rest.region || "",
      year: rest.year ? +rest.year : null, cost_price: +rest.costPrice || 0,
      price: +rest.price, promo_price: rest.promoPrice ? +rest.promoPrice : null,
      stock: +rest.stock || 0, category: rest.category || "Tinto",
      alcohol: rest.alcohol || "", grapes: rest.grapes || "",
      description: rest.description || "", keywords: rest.keywords || "",
      harmonization: rest.harmonization || "", img: imgUrl || null,
    };
    await supaFetch("wines", "PATCH", w, `id=eq.${id}`, supaCfg);
  };
  const dbDeleteWine = async (id) => {
    removeImgLocal(id);
    const wine = wines.find(w => w.id === id);
    if (wine?.img && wine.img.startsWith("http")) supaDeleteImage(wine.img, supaCfg);
    if (supaCfg) await supa.wines.delete(id, supaCfg);
  };
  const dbInsertOrder = async (order) => {
    // 19: Sempre persiste no localStorage para o ADM ver mesmo sem Supabase
    try {
      const local = JSON.parse(localStorage.getItem("v9_orders") || "[]");
      local.unshift(order);
      localStorage.setItem("v9_orders", JSON.stringify(local));
    } catch {}
    if (supaCfg) await supa.orders.insert(order, supaCfg);
  };
  const dbInsertReview = async (review) => {
    const r = { ...review, wine_id: review.wineId };
    if (supaCfg) await supa.reviews.insert(r, supaCfg);
  };
  const dbUpdateReview = async (review) => {
    if (supaCfg) await supa.reviews.update(review, supaCfg);
  };
  const dbDeleteReview = async (id) => {
    if (supaCfg) await supa.reviews.delete(id, supaCfg);
  };

  // Sanitização básica contra XSS
  const sanitize = (str) => String(str ?? "").replace(/[<>"'`]/g, "");

  // Validação de CPF
  const validarCPF = (cpf) => {
    const c = cpf.replace(/\D/g, "");
    if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
    let s = 0;
    for (let i = 0; i < 9; i++) s += +c[i] * (10 - i);
    let r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
    if (r !== +c[9]) return false;
    s = 0;
    for (let i = 0; i < 10; i++) s += +c[i] * (11 - i);
    r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
    return r === +c[10];
  };
  // 🧾 Checkout
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [pixQR, setPixQR] = useState("");
  const emptyCheckout = { nome: "", cpf: "", contato: "", cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "" };
  const [checkoutData, setCheckoutData] = useState(emptyCheckout);
  const [checkoutStep, setCheckoutStep] = useState(1);
  // 🚚 Frete selecionado no carrinho
  const [freteEscolhido, setFreteEscolhido] = useState(null); // { id, nome, icon, prazo, base }
  const freteTotal = freteEscolhido ? freteEscolhido.base : 0;
  const emptyWine = { name: "", origin: "", region: "", year: "", costPrice: "", price: "", promoPrice: "", stock: "", category: "Tinto", description: "", alcohol: "", grapes: "", img: null, keywords: "", harmonization: "" };
  const [newWine, setNewWine] = useState(emptyWine);
  const newImgRef = useRef();
  const editImgRef = useRef();

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  // Render form fields inline (never as a child component) to prevent focus loss on re-render
  const renderFormFields = (obj, setObj, imgRef) => {
    const inp = (field, label, type = "text", span = false, extra = {}) => (
      <div key={field} style={span ? { gridColumn: "1/-1" } : {}}>
        <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>{label}</label>
        <input type={type} value={obj[field] ?? ""} onChange={(e) => setObj((p) => ({ ...p, [field]: e.target.value }))}
          style={{ width: "100%", background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", ...extra }} />
      </div>
    );
    const c = +obj.costPrice || 0, s = +obj.price || 0;
    const mg = s > 0 ? (((s - c) / s) * 100).toFixed(1) : "0.0";
    const lc = Math.max(0, s - c);
    const mgCol = parseFloat(mg) >= 35 ? "#4ade80" : parseFloat(mg) >= 20 ? "#fbbf24" : "#f87171";
    return (
      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {inp("name",    "Título SEO do Vinho",    "text",   true)}
        {/* País de Origem — dropdown com países comuns + opção personalizada */}
        <div>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>País de Origem</label>
          <select value={["Argentina","Brasil","Chile","Portugal","França","Itália","Espanha","África do Sul","EUA","Uruguai","Austrália","Alemanha","Outro"].includes(obj.origin) || !obj.origin ? (obj.origin || "") : "Outro"}
            onChange={e => setObj(p => ({ ...p, origin: e.target.value === "Outro" ? "" : e.target.value }))}
            style={{ width: "100%", background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", marginBottom: 6 }}>
            <option value="">Selecione…</option>
          {["Argentina","Brasil","Chile","Portugal","França","Itália","Espanha","África do Sul","EUA","Uruguai","Austrália","Alemanha"].map(name => {
              const FLAGS = {"Argentina":"🇦🇷","Brasil":"🇧🇷","Chile":"🇨🇱","Portugal":"🇵🇹","França":"🇫🇷","Itália":"🇮🇹","Espanha":"🇪🇸","África do Sul":"🇿🇦","EUA":"🇺🇸","Uruguai":"🇺🇾","Austrália":"🇦🇺","Alemanha":"🇩🇪"};
              return <option key={name} value={name}>{FLAGS[name]} {name}</option>;
            })}
            <option value="Outro">✏️ Outro país…</option>
          </select>
          {(["Argentina","Brasil","Chile","Portugal","França","Itália","Espanha","África do Sul","EUA","Uruguai","Austrália","Alemanha"].includes(obj.origin) ? false : obj.origin !== undefined) && (
            <input type="text" value={obj.origin || ""} onChange={e => setObj(p => ({ ...p, origin: e.target.value }))} placeholder="Ex: Nova Zelândia"
              style={{ width: "100%", background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
          )}
        </div>
        {inp("region",  "Região",           "text",   false)}
        {inp("year",    "Safra",            "number", false)}
        {inp("costPrice","Preço de Custo (R$)","number",false)}
        {inp("price",   "Preço de Venda (R$)","number",false)}
        {/* Promo */}
        <div style={{ gridColumn: "1/-1" }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>
            Preço Promocional (R$) <span style={{ color: "#8b6060", fontSize: 8 }}>— deixe vazio para sem promoção</span>
          </label>
          <input type="number" value={obj.promoPrice ?? ""} onChange={(e) => setObj((p) => ({ ...p, promoPrice: e.target.value }))} placeholder="Ex: 349"
            style={{ width: "100%", background: obj.promoPrice ? "#1a1505" : "#120e0c", border: `1px solid ${obj.promoPrice ? "#5a4a10" : "#2a1f1f"}`, borderRadius: 4, padding: "9px 11px", color: "#fbbf24", fontSize: 13, fontFamily: "Georgia,serif" }} />
        </div>
        {/* Profit preview */}
        {(obj.costPrice || obj.price) ? (
          <div style={{ gridColumn: "1/-1", background: "#0e0a0a", border: "1px solid #2a1f1f", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 28, flexWrap: "wrap" }}>
            <div><div style={{ fontSize: 8, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 3 }}>Lucro / garrafa</div><div style={{ fontSize: 18, color: mgCol, fontWeight: "bold" }}>{fmt(lc)}</div></div>
            <div><div style={{ fontSize: 8, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 3 }}>Margem</div><div style={{ fontSize: 18, color: mgCol, fontWeight: "bold" }}>{mg}%</div></div>
            {obj.stock > 0 && <div><div style={{ fontSize: 8, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 3 }}>Lucro potencial</div><div style={{ fontSize: 18, color: "#e8b4b4", fontWeight: "bold" }}>{fmt(lc * (+obj.stock || 0))}</div></div>}
            {obj.promoPrice && +obj.promoPrice < +obj.price && <div><div style={{ fontSize: 8, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 3 }}>Desconto</div><div style={{ fontSize: 18, color: "#fbbf24", fontWeight: "bold" }}>-{discountPct(+obj.price, +obj.promoPrice)}%</div></div>}
          </div>
        ) : null}
        {inp("stock",   "Estoque",          "number", false)}
        {/* Categoria */}
        <div>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Categoria</label>
          <select value={obj.category ?? "Tinto"} onChange={(e) => setObj((p) => ({ ...p, category: e.target.value }))}
            style={{ width: "100%", background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }}>
            {["Tinto","Branco","Espumante","Rosé"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        {inp("alcohol", "Teor Alcoólico",   "text",   false)}
        {inp("grapes",  "Uvas",             "text",   true)}
        {/* Descrição */}
        <div style={{ gridColumn: "1/-1" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase" }}>Descrição</label>
            <button
              type="button"
              onClick={async () => {
                if (!obj.name) { showToast("Preencha o nome do vinho primeiro.", "error"); return; }
                setObj(p => ({ ...p, _aiLoading: true }));
                try {
                  const prompt = `Escreva uma descrição comercial atraente para um vinho com as seguintes características:
Nome: ${obj.name}
Categoria: ${obj.category || ""}
Origem: ${obj.origin || ""}
Região: ${obj.region || ""}
Uvas: ${obj.grapes || ""}
Safra: ${obj.year || ""}
Teor alcoólico: ${obj.alcohol || ""}

Escreva em português brasileiro, tom elegante e convidativo, máximo 2 frases curtas (até 120 caracteres). Foque no sabor, aroma e ocasião ideal. Apenas a descrição, sem título.`;
                  const res = await fetch(`https://withered-rice-255b.suavidadewil.workers.dev`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: [{ role: "user", content: prompt }], max_tokens: 150 })
                  });
                  const rawText3 = await res.text();
                  let data3;
                  try { data3 = JSON.parse(rawText3); } catch { data3 = { error: { message: `Resposta inválida: ${rawText3.slice(0,100)}` } }; }
                  if (data3.error) { showToast(`Erro IA: ${data3.error.message}`, "error"); setObj(p => ({ ...p, _aiLoading: false })); return; }
                  const text = data3.choices?.[0]?.message?.content?.trim() || "";
                  if (text) setObj(p => ({ ...p, description: text, _aiLoading: false }));
                  else { showToast("Não foi possível gerar a descrição.", "error"); setObj(p => ({ ...p, _aiLoading: false })); }
                } catch(e) { showToast(`Erro: ${e.message}`, "error"); setObj(p => ({ ...p, _aiLoading: false })); }
              }}
              disabled={obj._aiLoading}
              style={{ padding: "4px 10px", background: obj._aiLoading ? "#1a1410" : "rgba(139,44,44,.15)", border: "1px solid #8b2c2c", borderRadius: 4, color: obj._aiLoading ? "#5a4a4a" : "#e8b4b4", cursor: obj._aiLoading ? "not-allowed" : "pointer", fontSize: 10, fontFamily: "Georgia,serif", letterSpacing: 1, display: "flex", alignItems: "center", gap: 5, transition: "all .2s" }}>
              {obj._aiLoading ? "⏳ Gerando..." : "✨ Gerar com IA"}
            </button>
          </div>
          <textarea value={obj.description ?? ""} onChange={(e) => setObj((p) => ({ ...p, description: e.target.value }))} rows={3}
            placeholder="Clique em ✨ Gerar com IA para criar automaticamente..."
            style={{ width: "100%", background: "#120e0c", border: `1px solid ${obj._aiLoading ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", resize: "vertical", transition: "border .3s" }} />
        </div>
        {/* Harmonização personalizada */}
        <div style={{ gridColumn: "1/-1" }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>
            🍽️ Sugestões de Harmonização <span style={{ color: "#8b6060", fontSize: 8 }}>— separe por vírgula (ex: Carnes vermelhas, Queijos curados)</span>
          </label>
          <textarea value={obj.harmonization ?? ""} onChange={(e) => setObj((p) => ({ ...p, harmonization: e.target.value }))} rows={2}
            placeholder="Ex: 🥩 Carnes vermelhas, 🧀 Queijos curados, 🍄 Cogumelos"
            style={{ width: "100%", background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif", resize: "vertical" }} />
          <div style={{ fontSize: 9, color: "#3a2a2a", marginTop: 3 }}>Se vazio, usa as sugestões padrão da categoria ({obj.category}).</div>
        </div>
        {/* Palavras-chave SEO */}
        <div style={{ gridColumn: "1/-1" }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>
            🔍 Palavras-chave (SEO) <span style={{ color: "#8b6060", fontSize: 8 }}>— ajudam o produto a aparecer no Google</span>
          </label>
          <input type="text" value={obj.keywords ?? ""} onChange={(e) => setObj((p) => ({ ...p, keywords: e.target.value }))}
            placeholder="Ex: vinho tinto francês, bordeaux, presente para sommelier"
            style={{ width: "100%", background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 11px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
          <div style={{ fontSize: 9, color: "#3a2a2a", marginTop: 3 }}>Separe por vírgula. Essas palavras ficam invisíveis na página mas são lidas pelo Google.</div>
        </div>
        {/* Imagem */}
        <div style={{ gridColumn: "1/-1" }}>
          <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 8 }}>Imagem do Produto <span style={{ color: "#3a2a2a", fontSize: 8 }}>(recomendado 1024×1024)</span></label>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ width: 90, height: 90, borderRadius: 8, border: "1px solid #2a1f1f", overflow: "hidden", flexShrink: 0 }}>
              {obj.img ? <img src={obj.img} alt="preview" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <BottlePlaceholder size={60} />}
            </div>
            <div>
              <button type="button" onClick={() => imgRef.current?.click()} style={{ background: "#1a1410", border: "1px solid #3a2f2f", color: "#e8b4b4", padding: "8px 16px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif", display: "flex", alignItems: "center", gap: 7 }}>
                📷 Enviar Foto
              </button>
              {obj.img && <button type="button" onClick={() => setObj((p) => ({ ...p, img: null }))} style={{ marginTop: 5, background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif", display: "block" }}>Remover imagem</button>}
              <div style={{ fontSize: 9, color: "#3a2a2a", marginTop: 4 }}>JPG, PNG ou WebP · Exibido em 1024×1024</div>
            </div>
            <input ref={imgRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setObj((p) => ({ ...p, img: ev.target.result })); r.readAsDataURL(f); } e.target.value = ""; }} />
          </div>
        </div>
      </div>
    );
  };
  const handleLogin = () => {
    const rateLimitMsg = checkRateLimit();
    if (rateLimitMsg) { setLoginError(rateLimitMsg); return; }
    const stored = getAdmHash();
    if (hashStr(loginUser) === stored.user && hashStr(loginPass) === stored.pass) {
      setIsLoggedIn(true);
      setLoginError("");
      loginAttempts.count = 0;
      setLoginUser(""); setLoginPass("");
    } else {
      registerFailedAttempt();
      const remaining = 5 - loginAttempts.count;
      setLoginError(`Usuário ou senha incorretos.${remaining <= 2 && remaining > 0 ? ` ${remaining} tentativa(s) restante(s).` : ""}`);
    }
  };
  const addToCart = (wine) => {
    setCart((prev) => { const ex = prev.find((i) => i.id === wine.id); if (ex) return prev.map((i) => i.id === wine.id ? { ...i, qty: i.qty + 1 } : i); return [...prev, { ...wine, qty: 1 }]; });
    showToast(`${wine.name} adicionado ao carrinho!`);
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const cartTotal = cart.reduce((s, i) => s + (i.promoPrice || i.price) * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const discountAmt = appliedCoupon ? Math.round(cartTotal * (couponPct(appliedCoupon) / 100)) : 0;
  const cartFinal = cartTotal - discountAmt + (freteEscolhido?.base || 0);
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!COUPONS[code]) { showToast("Cupom inválido ou expirado.", "error"); return; }
    if (!couponValid(code)) { showToast(`Cupom ${code} atingiu o limite de usos.`, "error"); return; }
    setAppliedCoupon(code);
    showToast(`Cupom ${code} aplicado! ${couponPct(code)}% de desconto 🎉`);
  };
  const handleAddWine = async () => {
    if (!newWine.name || !newWine.price) return showToast("Preencha nome e preço de venda.", "error");
    const base = { ...newWine, price: +newWine.price, costPrice: +newWine.costPrice || 0, promoPrice: newWine.promoPrice ? +newWine.promoPrice : null, stock: +newWine.stock || 0, year: +newWine.year || "", sales: 0, rating: 4.5 };
    const saved = await dbAddWine(base);
    if (saved) {
      setWines((p) => [saved, ...p]); // vai para o INÍCIO da lista
      setAdmWinePage(1);              // volta para a página 1 para ver o novo vinho
      showToast("Vinho cadastrado e salvo no banco! ✅");
    } else {
      showToast("Erro ao salvar no banco. Verifique a conexão Supabase.", "error");
      return;
    }
    setNewWine(emptyWine); setAdminTab("wines");
    // Recarrega do banco para garantir sincronização
    if (supaCfg) setTimeout(() => loadFromSupabase(supaCfg), 800);
  };
  const handleSaveEdit = async () => {
    const updated = { ...editWine, price: +editWine.price, costPrice: +editWine.costPrice || 0, promoPrice: editWine.promoPrice ? +editWine.promoPrice : null, stock: +editWine.stock, year: +editWine.year };
    showToast("Salvando…");
    await dbUpdateWine(updated);
    setWines((p) => p.map((w) => w.id === updated.id ? updated : w));
    if (selectedWine?.id === updated.id) setSelectedWine(updated);
    setEditWine(null);
    showToast("Vinho atualizado! ✅");
    // Recarrega do banco para confirmar que foi salvo
    if (supaCfg) setTimeout(() => loadFromSupabase(supaCfg), 1000);
  };
  const handleDeleteWine = async (id) => { await dbDeleteWine(id); setWines((p) => p.filter((w) => w.id !== id)); showToast("Vinho removido.", "error"); };

  // 🎉 Welcome popup — show once after 1.5s
  useEffect(() => {
    if (!welcomeDismissed) {
      const t = setTimeout(() => setShowWelcomePopup(true), 1500);
      return () => clearTimeout(t);
    }
  }, [welcomeDismissed]);

  // ❤️ Wishlist toggle
  const toggleWishlist = (e, wineId) => {
    e.stopPropagation();
    const isIn = wishlist.includes(wineId);
    const next = isIn ? wishlist.filter(id => id !== wineId) : [...wishlist, wineId];
    setWishlist(next);
    try { localStorage.setItem("v9_wishlist_main", JSON.stringify(next)); } catch {}
    showToast(isIn ? "Removido dos favoritos" : "❤️ Adicionado aos favoritos!");
  };

  // 🛒 Update cart qty
  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  // 📊 Export CSV (ADM)
  const exportCSV = () => {
    const headers = ["id","name","origin","region","year","costPrice","price","promoPrice","stock","category","alcohol","grapes","description","rating","sales"];
    const rows = wines.map(w => headers.map(h => `"${(w[h] ?? "").toString().replace(/"/g,'""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "vinhos9-produtos.csv"; a.click();
    URL.revokeObjectURL(url);
    setExportMsg("CSV exportado com sucesso!");
    setTimeout(() => setExportMsg(""), 3000);
  };

  // 📥 Import CSV (ADM)
  const importCSV = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const lines = e.target.result.split("\n").filter(Boolean);
        const headers = lines[0].split(",").map(h => h.replace(/"/g,"").trim());
        const parsed = lines.slice(1).map((line, idx) => {
          const vals = line.match(/(".*?"|[^,]+)/g) || [];
          const obj = {};
          headers.forEach((h, i) => { obj[h] = (vals[i] || "").replace(/^"|"$/g,"").trim(); });
          // Aceita nomes alternativos de campos
          const description = obj.description || obj.desc || obj.descricao || obj.about || "";
          const harmonization = obj.harmonization || obj.harmonização || obj.foodPairing || obj.food_pairing || obj.harmonizacao || obj.pairing || "";
          const keywords = obj.keywords || obj.palavrasChave || obj.tags || obj.seo || "";
          const costPrice = +(obj.costPrice || obj.cost_price || obj.custo || 0);
          const promoPrice = obj.promoPrice || obj.promo_price || obj.promocao || "";
          return {
            ...obj,
            price: +obj.price || +obj.preco || 0,
            costPrice,
            promoPrice: promoPrice && +promoPrice > 0 ? +promoPrice : null,
            stock: +obj.stock || +obj.estoque || 0,
            year: +obj.year || +obj.ano || "",
            rating: +obj.rating || +obj.nota || 4.5,
            sales: +obj.sales || +obj.vendas || 0,
            img: null,
            category: obj.category || obj.categoria || "Tinto",
            description,
            keywords,
            harmonization,
          };
        }).filter(w => w.name && w.price > 0);

        if (parsed.length === 0) { showToast("Nenhum vinho válido encontrado no CSV.", "error"); return; }

        showToast(`Importando ${parsed.length} vinhos para o banco…`);
        const saved = [];
        for (const wine of parsed) {
          const result = await dbAddWine(wine);
          if (result) saved.push(result);
        }
        setWines(prev => [...prev, ...saved]);
        showToast(`✅ ${saved.length} de ${parsed.length} vinhos importados e salvos no banco!`);
      } catch (err) {
        console.error(err);
        showToast("Erro ao ler o CSV. Verifique o formato.", "error");
      }
    };
    reader.readAsText(file);
  };

  const totalRevenue = SALES_DATA.reduce((s, d) => s + d.revenue, 0);
  const totalCost = SALES_DATA.reduce((s, d) => s + d.cost, 0);
  const totalProfit = totalRevenue - totalCost;
  const avgMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);
  const maxRevenue = Math.max(...SALES_DATA.map((d) => d.revenue));

  const filteredWines = (() => {
    const base = wines.filter((w) => {
      const activePrice = w.promoPrice || w.price;
      return (filter === "Todos" || w.category === filter)
        && (countryFilter === "Todos" || (w.origin || "").toLowerCase() === countryFilter.toLowerCase())
        && (w.name.toLowerCase().includes(search.toLowerCase()) || (w.origin || "").toLowerCase().includes(search.toLowerCase()))
        && activePrice >= priceRange[0] && activePrice <= priceRange[1];
    });
    if (sortBy === "price_asc") return [...base].sort((a,b) => (a.promoPrice||a.price)-(b.promoPrice||b.price));
    if (sortBy === "price_desc") return [...base].sort((a,b) => (b.promoPrice||b.price)-(a.promoPrice||a.price));
    if (sortBy === "rating") return [...base].sort((a,b) => b.rating-a.rating);
    if (sortBy === "name") return [...base].sort((a,b) => a.name.localeCompare(b.name));
    return base;
  })();
  const promoWines = wines.filter((w) => w.promoPrice && w.promoPrice < w.price);

  // Skeleton loading on filter/search change
  useEffect(() => {
    setCatalogLoading(true);
    const t = setTimeout(() => setCatalogLoading(false), 380);
    return () => clearTimeout(t);
  }, [filter, countryFilter, search, sortBy, priceRange[0], priceRange[1]]);

  // ── PWA: manifest dinâmico + service worker + install prompt ─────────────
  const [pwaPrompt, setPwaPrompt] = useState(null);
  const [pwaInstalled, setPwaInstalled] = useState(false);

  useEffect(() => {
    // 1. Manifest dinâmico via Blob URL
    const manifest = {
      name: "Vinhos9 — Importados Selecionados",
      short_name: "Vinhos9",
      description: "Vinhos importados selecionados das melhores regiões vinícolas do mundo.",
      start_url: window.location.pathname || "/",
      display: "standalone",
      orientation: "portrait-primary",
      background_color: "#0c0a09",
      theme_color: "#8b2c2c",
      lang: "pt-BR",
      categories: ["shopping", "food"],
      icons: [
        { src: PWA_ICON_192, sizes: "192x192", type: "image/png", purpose: "any maskable" },
        { src: PWA_ICON_512, sizes: "512x512", type: "image/png", purpose: "any maskable" },
      ],
      shortcuts: [
        { name: "Ver Catálogo", short_name: "Catálogo", url: window.location.pathname + "?page=store", icons: [{ src: PWA_ICON_192, sizes: "192x192" }] },
      ],
      screenshots: [],
    };
    const blob = new Blob([JSON.stringify(manifest)], { type: "application/manifest+json" });
    const manifestUrl = URL.createObjectURL(blob);
    let link = document.querySelector('link[rel="manifest"]');
    if (!link) { link = document.createElement("link"); link.rel = "manifest"; document.head.appendChild(link); }
    link.href = manifestUrl;

    // 2. Theme color para barra do sistema
    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) { themeMeta = document.createElement("meta"); themeMeta.name = "theme-color"; document.head.appendChild(themeMeta); }
    themeMeta.content = "#8b2c2c";

    // 3. Meta mobile-web-app para iOS
    const metas = [
      ["apple-mobile-web-app-capable",        "yes"],
      ["apple-mobile-web-app-status-bar-style","black-translucent"],
      ["apple-mobile-web-app-title",           "Vinhos9"],
      ["mobile-web-app-capable",               "yes"],
      ["application-name",                     "Vinhos9"],
    ];
    metas.forEach(([name, content]) => {
      let m = document.querySelector(`meta[name="${name}"]`);
      if (!m) { m = document.createElement("meta"); m.name = name; document.head.appendChild(m); }
      m.content = content;
    });

    // 4. Service Worker para cache offline
    if ("serviceWorker" in navigator) {
      const swCode = `
const CACHE = "vinhos9-v1";
const PRECACHE = ["/"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
      `;
      const swBlob = new Blob([swCode], { type: "application/javascript" });
      const swUrl = URL.createObjectURL(swBlob);
      navigator.serviceWorker.register(swUrl).catch(() => {});
    }

    // 5. Capturar prompt de instalação
    const handler = (e) => { e.preventDefault(); setPwaPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => { setPwaInstalled(true); setPwaPrompt(null); });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      URL.revokeObjectURL(manifestUrl);
    };
  }, []);

  const handlePwaInstall = async () => {
    if (!pwaPrompt) return;
    pwaPrompt.prompt();
    const { outcome } = await pwaPrompt.userChoice;
    if (outcome === "accepted") { setPwaInstalled(true); setPwaPrompt(null); }
  };

  // ── Vercel Analytics + Speed Insights via script injection ────────────────
  useEffect(() => {
    // Analytics
    if (!document.getElementById("va-script")) {
      const s = document.createElement("script");
      s.id = "va-script";
      s.defer = true;
      s.src = "https://va.vercel-scripts.com/v1/script.js";
      document.head.appendChild(s);
    }
    // Speed Insights
    if (!document.getElementById("vsi-script")) {
      const s = document.createElement("script");
      s.id = "vsi-script";
      s.defer = true;
      s.src = "https://va.vercel-scripts.com/v1/speed-insights/script.js";
      document.head.appendChild(s);
    }
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  // ── SEO completo: 10, 7, 4, 5, 3, 9, 2, 1, 8, 6 ──────────────────────────
  useEffect(() => {
    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        const parts = sel.replace("meta[","").replace("]","").split("=");
        el.setAttribute(parts[0], parts[1].replace(/"/g,""));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement("link"); el.rel = rel; document.head.appendChild(el); }
      el.href = href;
    };
    const removeScript = (id) => { const el = document.getElementById(id); if (el) el.remove(); };
    const addScript = (id, content) => {
      removeScript(id);
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = id;
      s.textContent = content;
      document.head.appendChild(s);
    };

    const BASE_URL = window.location.origin + window.location.pathname.replace(/\/$/, "");
    const STORE_NAME = "Vinhos9";
    const STORE_DESC = "Vinhos importados selecionados das melhores regiões vinícolas do mundo. Tinto, branco, espumante e rosé com entrega para todo o Brasil.";
    const STORE_LOGO = LOGO_URI;

    if (selectedWine) {
      const w = selectedWine;
      const price = w.promoPrice || w.price;
      const productUrl = `${BASE_URL}?produto=${w.id}`;
      const img = w.img || STORE_LOGO;
      const fullDesc = w.description || `${w.name} — ${w.category} de ${w.origin}. Disponível na Vinhos9 com entrega para todo o Brasil.`;
      const keywords = [w.name, w.origin, w.region, w.category, w.grapes, w.keywords, `comprar ${w.category?.toLowerCase()}`, `vinho importado ${w.origin}`].filter(Boolean).join(", ");

      // 10: title
      document.title = `${w.name}${w.year ? ` (${w.year})` : ""} — ${STORE_NAME}`;

      // 9: meta keywords e description
      setMeta('meta[name="description"]', "content", fullDesc);
      setMeta('meta[name="keywords"]',    "content", keywords);

      // 5: canonical
      setLink("canonical", productUrl);

      // 3: Open Graph
      setMeta('meta[property="og:type"]',         "content", "product");
      setMeta('meta[property="og:title"]',        "content", `${w.name}${w.year ? ` (${w.year})` : ""}`);
      setMeta('meta[property="og:description"]',  "content", fullDesc);
      setMeta('meta[property="og:url"]',          "content", productUrl);
      setMeta('meta[property="og:image"]',        "content", img);
      setMeta('meta[property="og:site_name"]',    "content", STORE_NAME);
      setMeta('meta[property="product:price:amount"]',   "content", String(price));
      setMeta('meta[property="product:price:currency"]', "content", "BRL");

      // 4: Twitter Card
      setMeta('meta[name="twitter:card"]',        "content", "summary_large_image");
      setMeta('meta[name="twitter:title"]',       "content", `${w.name}${w.year ? ` (${w.year})` : ""}`);
      setMeta('meta[name="twitter:description"]', "content", fullDesc);
      setMeta('meta[name="twitter:image"]',       "content", img);

      // 1: Schema.org Product
      addScript("schema-product", JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": w.name,
        "description": fullDesc,
        "image": img,
        "url": productUrl,
        "brand": { "@type": "Brand", "name": w.origin || STORE_NAME },
        "category": `Vinhos > ${w.category}`,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "price": String(price),
          "availability": w.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "url": productUrl,
          "seller": { "@type": "Organization", "name": STORE_NAME }
        },
        ...(w.rating ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": String(w.rating),
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": String(w.sales > 0 ? w.sales : 1)
          }
        } : {}),
        // 8: BreadcrumbList
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": STORE_NAME, "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": w.category,  "item": `${BASE_URL}?categoria=${w.category}` },
            { "@type": "ListItem", "position": 3, "name": w.name,      "item": productUrl }
          ]
        }
      }));
      removeScript("schema-org");
      removeScript("schema-sitemap");

    } else {
      // Home / catálogo
      document.title = `${STORE_NAME} — Vinhos Importados de Excelência`;

      // 10: meta description da home
      setMeta('meta[name="description"]', "content", STORE_DESC);
      setMeta('meta[name="keywords"]',    "content", "vinhos importados, vinho tinto, vinho branco, espumante, rosé, comprar vinho online, vinho argentino, vinho chileno, vinho francês, vinho português, harmonização");

      // 5: canonical da home
      setLink("canonical", BASE_URL);

      // 3: Open Graph da home
      setMeta('meta[property="og:type"]',        "content", "website");
      setMeta('meta[property="og:title"]',       "content", `${STORE_NAME} — Vinhos Importados de Excelência`);
      setMeta('meta[property="og:description"]', "content", STORE_DESC);
      setMeta('meta[property="og:url"]',         "content", BASE_URL);
      setMeta('meta[property="og:image"]',       "content", STORE_LOGO);
      setMeta('meta[property="og:site_name"]',   "content", STORE_NAME);

      // 4: Twitter Card da home
      setMeta('meta[name="twitter:card"]',        "content", "summary_large_image");
      setMeta('meta[name="twitter:title"]',       "content", `${STORE_NAME} — Vinhos Importados de Excelência`);
      setMeta('meta[name="twitter:description"]', "content", STORE_DESC);
      setMeta('meta[name="twitter:image"]',       "content", STORE_LOGO);

      // 2: Schema.org Organization
      addScript("schema-org", JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": STORE_NAME,
        "url": BASE_URL,
        "logo": STORE_LOGO,
        "description": STORE_DESC,
        "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": "Portuguese" }
      }));

      // 6: Sitemap dinâmico via WebSite + SearchAction (sitelinks searchbox)
      addScript("schema-sitemap", JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": STORE_NAME,
        "url": BASE_URL,
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}?busca={search_term_string}` },
          "query-input": "required name=search_term_string"
        }
      }));
      removeScript("schema-product");
    }

    // Favicon padrão (sempre)
    setLink("icon", FAV_URI);
    setLink("apple-touch-icon", LOGO_URI);

    // 7: robots meta (sempre)

    // Favicon dinâmico
    const setFavicon = () => {
      let lnk = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      if (!lnk) { lnk = document.createElement("link"); lnk.rel = "icon"; document.head.appendChild(lnk); }
      lnk.type = "image/png";
      lnk.href = FAV_IMG;
    };
    setFavicon();

    setMeta('meta[name="robots"]', "content", "index, follow, max-image-preview:large");
    setMeta('meta[name="viewport"]', "content", "width=device-width, initial-scale=1");

  }, [selectedWine, wines]);
  // ───────────────────────────────────────────────────────────────────────────
  const relatedWines = selectedWine ? (() => {
    const sameCategory = wines.filter((w) => w.category === selectedWine.category && w.id !== selectedWine.id);
    if (sameCategory.length >= 3) return sameCategory;
    // Pad with other wines sorted by rating to reach up to 6
    const others = wines.filter((w) => w.category !== selectedWine.category && w.id !== selectedWine.id)
      .sort((a, b) => b.rating - a.rating);
    return [...sameCategory, ...others].slice(0, 6);
  })() : [];



  // Manutenção: bloqueia clientes (admins logados passam; ?adm=1 permite acesso emergencial)
  if (maintenanceCfg?.ativo && !isLoggedIn && !new URLSearchParams(window.location.search).get("adm")) return <MaintenancePage />;

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", minHeight: "100vh", background: "#0c0a09", color: "#f5f0e8" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden;max-width:100vw}

        /* ── BASE (mobile-first) ── */
        body,html{font-size:15px}
        main,aside,.adm-layout{font-size:15px}

        /* ── TABLET: 768px – 1023px ── */
        @media(min-width:769px) and (max-width:1023px){
          body,html{font-size:15px}
          main,aside,.adm-layout{font-size:15px}
          .wine-card .wc-name{font-size:15px!important}
          .wine-card .wc-price{font-size:20px!important}
          .wine-card .wc-desc{font-size:13px!important}
          .btn-red,.btn-ghost{font-size:14px!important}
          .nav-link{font-size:14px!important}
          input,select,textarea{font-size:14px!important}
          .hero-title{font-size:40px!important}
          h2{font-size:19px!important}
          h3{font-size:17px!important}
          .adm-content h1,.adm-content h2{font-size:19px!important}
          .adm-content p,.adm-content label{font-size:13px!important}
          .adm-content input,.adm-content select,.adm-content textarea{font-size:13px!important}
          .adm-content td{font-size:13px!important}
          .adm-sidebar button{font-size:13px!important}
        }

        /* ── NOTEBOOK: 1024px – 1439px ── */
        @media(min-width:1024px) and (max-width:1439px){
          body,html{font-size:16px}
          main,aside,.adm-layout{font-size:16px}
          .wine-card .wc-name{font-size:16px!important}
          .wine-card .wc-price{font-size:22px!important}
          .wine-card .wc-desc{font-size:14px!important}
          .wine-card .wc-old-price{font-size:13px!important}
          .wine-card .wc-stock{font-size:13px!important}
          .btn-red,.btn-ghost{font-size:15px!important}
          .nav-link{font-size:15px!important}
          input,select,textarea{font-size:15px!important}
          .hero-title{font-size:48px!important}
          h2{font-size:21px!important}
          h3{font-size:18px!important}
          .adm-content h1,.adm-content h2{font-size:21px!important}
          .adm-content p{font-size:14px!important}
          .adm-content label{font-size:13px!important}
          .adm-content input,.adm-content select,.adm-content textarea{font-size:14px!important}
          .adm-content td{font-size:14px!important}
          .adm-sidebar button{font-size:14px!important}
          .detail-flex h1{font-size:25px!important}
          .detail-flex p{font-size:14px!important}
        }

        /* ── DESKTOP LARGO: 1440px+ ── */
        @media(min-width:1440px){
          body,html{font-size:17px}
          main,aside,.adm-layout{font-size:17px}
          .wine-card .wc-name{font-size:17px!important}
          .wine-card .wc-price{font-size:24px!important}
          .wine-card .wc-desc{font-size:15px!important}
          .wine-card .wc-old-price{font-size:13px!important}
          .wine-card .wc-stock{font-size:13px!important}
          .btn-red,.btn-ghost{font-size:16px!important}
          .nav-link{font-size:16px!important}
          input,select,textarea{font-size:16px!important}
          .hero-title{font-size:56px!important}
          h2{font-size:23px!important}
          h3{font-size:20px!important}
          .adm-content h1,.adm-content h2{font-size:23px!important}
          .adm-content p{font-size:15px!important}
          .adm-content label{font-size:14px!important}
          .adm-content input,.adm-content select,.adm-content textarea{font-size:15px!important}
          .adm-content td{font-size:15px!important}
          .adm-sidebar button{font-size:14px!important}
          .detail-flex h1{font-size:29px!important}
          .detail-flex p{font-size:16px!important}
        }

        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#1a1410}::-webkit-scrollbar-thumb{background:#8b2c2c;border-radius:3px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bannerIn{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:scale(1)}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes toastIn{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .wine-card{transition:all .3s ease;cursor:pointer}
        .wine-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(139,44,44,.35)!important}
        .wine-card .wc-name{font-size:15px;color:#f5f0e8;font-weight:bold}
        .wine-card .wc-origin{font-size:13px;color:#7a6a6a}
        .wine-card .wc-desc{font-size:13px;color:#7a6a6a;line-height:1.55}
        .wine-card .wc-price{font-size:19px;font-weight:bold}
        .wine-card .wc-old-price{font-size:12px;color:#5a4a4a;text-decoration:line-through}
        .wine-card .wc-stock{font-size:12px;color:#5a4a4a}
        .wine-section-offscreen{content-visibility:auto;contain-intrinsic-size:0 400px}
        .btn-red{background:#8b2c2c;border:none;color:#fff;cursor:pointer;font-family:Georgia,serif;transition:background .2s;font-size:14px!important}
        .btn-red:hover{background:#a83232!important}
        .btn-ghost{background:transparent;border:1px solid #2a1f1f;color:#8a7a7a;cursor:pointer;font-family:Georgia,serif;transition:all .2s;font-size:14px!important}
        .btn-ghost:hover{border-color:#6a5a5a!important;color:#b0a090!important}
        .nav-link{cursor:pointer;font-size:15px!important;letter-spacing:2px;text-transform:uppercase;transition:color .2s}
        .nav-link:hover{color:#e8b4b4!important}
        .adm-tab:hover{background:rgba(139,44,44,.3)!important}
        input,select,textarea{outline:none;font-size:14px!important}
        input:focus,select:focus,textarea:focus{border-color:#8b2c2c!important}
        .scroll-row{display:flex;gap:14px;overflow-x:auto;padding-bottom:8px}
        .scroll-row::-webkit-scrollbar{height:4px}
        .scroll-row::-webkit-scrollbar-thumb{background:#2a1f1f;border-radius:2px}
        .home-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:16px}

        /* ── ADM: textos mais claros ── */
        .adm-content{color:#d0c0c0!important}
        .adm-content h1,.adm-content h2,.adm-content h3{color:#f0dede!important}
        .adm-content p{color:#b8a8a8!important}
        .adm-content label{color:#c8b0b0!important}
        .adm-content input,.adm-content select,.adm-content textarea{color:#f0dede!important}
        .adm-content td{color:#c8b8b8!important}
        .adm-content th{color:#b09090!important;font-size:11px!important;letter-spacing:1.5px}
        .adm-content span:not([style]){color:#c0b0b0}
        .adm-sidebar button{color:#c0a8a8!important}
        .adm-sidebar button[style*="color:#e8b4b4"]{color:#e8b4b4!important}

        /* ── MOBILE: cores claras via variável customizada ── */
        @media(max-width:768px){
          :root{--txt-dim:#b0a0a0;--txt-muted:#a09090;--txt-faint:#888080}
          body,html{font-size:15px}
          main,aside,.adm-layout{font-size:14px}

          /* Descrição dos cards menor no mobile para não poluir */
          .wine-card .wc-desc{font-size:10px!important;line-height:1.4!important;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}

          /* Clarear todas as cores de texto escuras no mobile */
          [style*="color: #5a4a4a"],[style*="color:#5a4a4a"]{color:#9a8a8a!important}
          [style*="color: #7a6a6a"],[style*="color:#7a6a6a"]{color:#b0a0a0!important}
          [style*="color: #a09080"],[style*="color:#a09080"]{color:#c8b8b0!important}
          [style*="color: #3a2a2a"],[style*="color:#3a2a2a"]{color:#8a7a7a!important}
          [style*="color: #4a3a3a"],[style*="color:#4a3a3a"]{color:#9a8a8a!important}
          [style*="color: #8b6060"],[style*="color:#8b6060"]{color:#c09090!important}

          .desktop-nav{display:none!important}
          .mobile-nav{display:flex!important}
          .hero-title{font-size:28px!important}
          .hero-sec{height:280px!important}

          /* Catálogo mobile — cards maiores com fonte legível */
          .catalog-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important}
          .home-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important}
          .cat-pad{padding:16px 14px 0!important}
          .filters-row{flex-direction:column!important;gap:10px!important}
          .cat-btns{flex-wrap:wrap!important;gap:8px!important}

          /* Botões */
          .btn-red,.btn-ghost{font-size:15px!important;padding:11px 18px!important}
          .nav-link{font-size:15px!important}
          input,select,textarea{font-size:16px!important}

          /* Textos globais no mobile */
          p{font-size:14px!important;color:#c8b8b0!important;line-height:1.7!important}
          h1{font-size:22px!important;color:#f5f0e8!important}
          h2{font-size:19px!important;color:#f0e8e8!important}
          h3{font-size:17px!important}
          label{font-size:13px!important;color:#c0b0b0!important}
          span{color:inherit}

          /* Cards de vinho — nome, origem, preço mais legíveis */
          .wine-card h3{font-size:14px!important;color:#f5f0e8!important}
          .wine-card .wc-name{font-size:14px!important;color:#f0e8e8!important}
          .wine-card .wc-origin{font-size:12px!important;color:#b0a0a0!important}
          .wine-card .wc-desc{font-size:12px!important;color:#a09090!important}
          .wine-card .wc-price{font-size:18px!important}
          .wine-card .wc-old-price{font-size:11px!important;color:#8a7a7a!important}
          .wine-card .wc-stock{font-size:11px!important;color:#a09090!important}

          /* Textos gerais de apoio — clarear no mobile */
          .txt-muted{color:#b0a0a0!important;font-size:13px!important}
          .txt-dim{color:#a09090!important}
          .txt-faint{color:#888080!important}

          /* ADM */
          .adm-layout{flex-direction:column!important}
          .adm-sidebar{width:100%!important;flex-direction:row!important;display:flex!important;overflow-x:auto!important;padding:0!important;border-right:none!important;border-bottom:1px solid #2a1f1f!important;position:static!important;align-items:center!important}
          .adm-sidebar>div:first-child{display:none!important}
          .adm-sidebar>div.adm-tabs-wrap{display:contents!important;flex:1!important}
          .adm-sidebar>div.adm-sair-wrap{flex-shrink:0!important;padding:4px 8px!important;border-left:1px solid #2a1f1f!important}
          .adm-sidebar button{white-space:nowrap!important;border-left:none!important;border-bottom:3px solid transparent!important;padding:12px 14px!important;font-size:14px!important}
          .adm-content{padding:16px 12px!important;font-size:15px!important}
          .kpi-grid{grid-template-columns:repeat(2,1fr)!important}
          .form-grid{grid-template-columns:1fr!important}
          .tbl{font-size:13px!important}
          .tbl td,.tbl th{padding:10px 10px!important}
          .detail-flex{flex-direction:column!important}
          .detail-img{width:100%!important;flexShrink:unset!important}
          .cart-panel{width:100%!important}
          .promo-banner{flex-direction:column!important;gap:12px!important}
        }
        @media(min-width:480px) and (max-width:768px){
          .form-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {toast && <div style={{ position: "fixed", top: 20, right: 16, zIndex: 9999, background: toast.type === "error" ? "#7f1d1d" : "#1a3a1a", border: `1px solid ${toast.type === "error" ? "#ef4444" : "#4ade80"}`, color: "#fff", padding: "11px 18px", borderRadius: 8, animation: "toastIn .3s ease", fontSize: 13, maxWidth: 300 }}>{toast.msg}</div>}

      {/* ── Banner PWA: instalar como app ── */}
      {pwaPrompt && !pwaInstalled && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9998, background: "linear-gradient(135deg,#1a0a0a,#2a1010)", borderTop: "2px solid #8b2c2c", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, animation: "slideUp .4s ease", boxShadow: "0 -4px 32px rgba(0,0,0,.6)" }}>
          <img src={PWA_ICON_192} alt="Vinhos9" style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: "#f5f0e8", fontWeight: "bold", marginBottom: 2 }}>Instalar Vinhos9</div>
            <div style={{ fontSize: 12, color: "#a09080", lineHeight: 1.5 }}>Adicione à tela inicial e acesse como app</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button onClick={handlePwaInstall}
              style={{ padding: "9px 18px", background: "#8b2c2c", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif", fontWeight: "bold" }}>
              Instalar
            </button>
            <button onClick={() => setPwaPrompt(null)}
              style={{ padding: "9px 14px", background: "none", border: "1px solid #2a1f1f", borderRadius: 6, color: "#7a6a6a", cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif" }}>
              Agora não
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ background: "rgba(12,10,9,.97)", borderBottom: "1px solid #2a1f1f", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
          onClick={() => { setPage("store"); setSelectedWine(null); }}>
          <img src={LOGO_URI} alt="Vinhos9" className="logo-img" fetchpriority="high" decoding="sync" style={{ height: 42, width: "auto", objectFit: "contain", display: "block" }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 2, color: "#e8b4b4", lineHeight: 1.2 }}>VINHOS9</div>
            <div style={{ fontSize: 8, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase" }}>Importados Selecionados</div>
          </div>
        </div>
        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <span className="nav-link" onClick={() => { setPage("store"); setSelectedWine(null); }} style={{ color: page === "store" ? "#e8b4b4" : "#a09090" }}>Loja</span>
          <span className="nav-link" onClick={() => { setPage("about"); setSelectedWine(null); }} style={{ color: page === "about" ? "#e8b4b4" : "#a09090" }}>Sobre</span>
          <span className="nav-link" onClick={() => openClientPanel("wishlist")} style={{ color: "#a09090", display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
            ❤️
            {wishlist.length > 0 && <span style={{ background: "#8b2c2c", color: "#fff", borderRadius: "50%", width: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: "bold", position: "absolute", top: -6, right: -8 }}>{wishlist.length}</span>}
          </span>
          <span className="nav-link" onClick={() => openClientPanel("orders")} style={{ color: "#a09090", display: "flex", alignItems: "center", gap: 4 }}>👤 Conta</span>
          <span className="nav-link" onClick={() => setPage("admin")} style={{ color: page === "admin" ? "#e8b4b4" : "#a09090" }}>ADM</span>
          {page === "store" && (
            <button className="btn-red" onClick={() => setCartOpen(true)} style={{ padding: "7px 14px", borderRadius: 4, fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
              🛒 {cartCount > 0 && <span style={{ background: "#e8b4b4", color: "#1a0a0a", borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: "bold" }}>{cartCount}</span>}
            </button>
          )}
        </nav>
        {/* Mobile: cart + hamburger */}
        <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 10 }}>
          {page === "store" && (
            <button className="btn-red" onClick={() => setCartOpen(true)} style={{ padding: "7px 12px", borderRadius: 4, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
              🛒 {cartCount > 0 && <span style={{ background: "#e8b4b4", color: "#1a0a0a", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: "bold" }}>{cartCount}</span>}
            </button>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "1px solid #2a1f1f", borderRadius: 6, color: "#e8b4b4", cursor: "pointer", padding: "6px 10px", fontSize: 16, fontFamily: "Georgia,serif" }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>
      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div style={{ position: "sticky", top: 62, zIndex: 99, background: "#140e0e", borderBottom: "1px solid #2a1f1f", padding: "8px 0", animation: "fadeIn .2s ease" }}>
          {[["store","🏠 Loja"],["about","🌍 Sobre"],["admin","🔐 ADM"]].map(([p, label]) => (
            <div key={p} onClick={() => { setPage(p); setSelectedWine(null); setMobileMenuOpen(false); }}
              style={{ padding: "13px 22px", cursor: "pointer", color: page === p ? "#e8b4b4" : "#a09080", fontSize: 13, letterSpacing: 1, borderLeft: page === p ? "3px solid #8b2c2c" : "3px solid transparent" }}>
              {label}
            </div>
          ))}
          <div onClick={() => { openClientPanel("orders"); setMobileMenuOpen(false); }}
            style={{ padding: "13px 22px", cursor: "pointer", color: "#a09080", fontSize: 13, letterSpacing: 1, borderLeft: "3px solid transparent" }}>
            👤 Minha Conta
          </div>
          <div onClick={() => { openClientPanel("wishlist"); setMobileMenuOpen(false); }}
            style={{ padding: "13px 22px", cursor: "pointer", color: "#e8b4b4", fontSize: 13, letterSpacing: 1, borderLeft: "3px solid transparent", display: "flex", alignItems: "center", gap: 8 }}>
            ❤️ Favoritos {wishlist.length > 0 && <span style={{ background: "#8b2c2c", color: "#fff", borderRadius: 99, padding: "1px 7px", fontSize: 10, fontWeight: "bold" }}>{wishlist.length}</span>}
          </div>
        </div>
      )}

      {/* ── INFO SLIDER — sempre logo abaixo do cabeçalho ── */}
      <InfoSlider />

      {/* ── LOJA ── */}
      {page === "store" && !selectedWine && (
        <main style={{ animation: "fadeIn .4s ease" }}>

          {/* Carrossel de Banners */}
          <ImageBannerCarousel banners={banners} />

          {/* Banner promoções */}
          {promoWines.length > 0 && (
            <div id="promocoes" style={{ background: "linear-gradient(135deg,#1a1000,#2a1a00)", borderTop: "1px solid #3a2a00", borderBottom: "1px solid #3a2a00", padding: "32px 36px" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div className="promo-banner" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 22 }}>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 4, color: "#b45309", textTransform: "uppercase", marginBottom: 4 }}>Ofertas Especiais</div>
                    <h2 style={{ fontSize: 22, color: "#fbbf24", letterSpacing: 1 }}>🏷 Em Promoção</h2>
                  </div>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,#3a2a00,transparent)" }} />
                  <span style={{ fontSize: 11, color: "#b45309", letterSpacing: 1 }}>{promoWines.length} ofertas ativas</span>
                </div>
                <div className="scroll-row">
                  {promoWines.map((wine) => (
                    <div key={wine.id} onClick={() => { setSelectedWine(wine); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer", background: "linear-gradient(145deg,#1e1500,#150e00)", border: "1px solid #3a2a00", borderRadius: 12, overflow: "hidden", flexShrink: 0, width: 200, transition: "all .25s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(180,83,9,.25)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                      <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                        <WineThumb wine={wine} height="100%" />
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom,transparent 50%,rgba(21,14,0,.85))" }} />
                        <div style={{ position: "absolute", top: 10, left: 10, background: "#b45309", color: "#fef3c7", fontSize: 11, padding: "3px 9px", borderRadius: 4, fontWeight: "bold", letterSpacing: 1 }}>-{discountPct(wine.price, wine.promoPrice)}%</div>
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div style={{ fontSize: 12, color: "#f5f0e8", fontWeight: "bold", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{wine.name}</div>
                        <div style={{ fontSize: 10, color: "#7a6a6a", marginBottom: 4 }}>{wine.origin}</div>
                        {wine.description && <div style={{ fontSize: 10, color: "#6a5a5a", lineHeight: 1.45, marginBottom: 6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{wine.description.slice(0, 72)}{wine.description.length > 72 ? "…" : ""}</div>}
                        <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 6 }}>
                          <span style={{ fontSize: 16, color: "#fbbf24", fontWeight: "bold" }}>{fmt(wine.promoPrice)}</span>
                          <span style={{ fontSize: 11, color: "#5a4a4a", textDecoration: "line-through" }}>{fmt(wine.price)}</span>
                        </div>
                        <div style={{ marginBottom: 8 }}><PromoTimer wineId={wine.id} compact /></div>
                        <button className="btn-red" onClick={(e) => { e.stopPropagation(); addToCart(wine); }} style={{ width: "100%", padding: "7px", borderRadius: 4, fontSize: 10, letterSpacing: 1 }}>+ Carrinho</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4+5+6: Seções de destaque + botão Ver Todos */}
          {wines.length > 0 && (
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 20px 0" }}>

              {/* 6: Botão Ver Todos */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 6 }}>Nosso acervo</div>
                  <h2 style={{ fontSize: 24, color: "#f5f0e8" }}>Explore todos os rótulos</h2>
                </div>
                <button className="btn-red" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ padding: "13px 30px", borderRadius: 6, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                  🍷 Ver Todos os Vinhos
                </button>
              </div>

              {/* 4: Recém Chegados — carrossel animado com swipe, 6 itens aleatórios */}
              {wines.length > 0 && (
                <HomeCarousel
                  items={[...wines].sort(() => Math.random() - 0.5).slice(0, 6)}
                  title="🆕 Recém Chegados"
                  subtitle="Novidades"
                  accentColor="#e8b4b4"
                  badge={{ bg: "rgba(96,165,250,.85)", text: "NOVO" }}
                  onSelect={(wine) => { setSelectedWine(wine); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  addToCart={addToCart}
                />
              )}

              {/* 5: Mais Vendidos — carrossel animado com swipe */}
              {wines.filter(w => w.sales > 0).length > 0 && (
                <HomeCarousel
                  items={[...wines].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 9)}
                  title="🏆 Mais Vendidos"
                  subtitle="Favoritos dos clientes"
                  accentColor="#fbbf24"
                  badge={{ bg: "rgba(180,83,9,.85)", text: (wine) => `${wine.sales} vendas` }}
                  onSelect={(wine) => { setSelectedWine(wine); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  addToCart={addToCart}
                />
              )}
            </div>
          )}

          {/* Catálogo */}
          <div id="catalog" className="cat-pad" style={{ padding: "32px 36px 0", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 4 }}>Nosso Catálogo</div>
              <h2 style={{ fontSize: 20, color: "#f5f0e8" }}>Todos os Vinhos</h2>
            </div>
            <div className="filters-row" style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 22 }}>
              {/* Autocomplete Search */}
              <div style={{ flex: 1, minWidth: 190, position: "relative" }}>
                <input value={search} onChange={(e) => { setSearch(e.target.value); setShowAutocomplete(e.target.value.length > 0); }}
                  onFocus={() => search.length > 0 && setShowAutocomplete(true)}
                  onBlur={() => setTimeout(() => setShowAutocomplete(false), 180)}
                  placeholder="Buscar vinho ou origem..."
                  style={{ width: "100%", background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 4, padding: "9px 13px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                {showAutocomplete && search.length > 0 && (() => {
                  const suggestions = wines.filter(w =>
                    w.name.toLowerCase().includes(search.toLowerCase()) ||
                    w.origin.toLowerCase().includes(search.toLowerCase())
                  ).slice(0, 6);
                  return suggestions.length > 0 ? (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 60, background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 6, marginTop: 4, boxShadow: "0 12px 40px rgba(0,0,0,.6)", overflow: "hidden" }}>
                      {suggestions.map(w => (
                        <div key={w.id} onClick={() => { setSearch(w.name); setShowAutocomplete(false); }}
                          style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", cursor: "pointer", borderBottom: "1px solid #140e0e" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#2a1f1f"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <div style={{ width: 32, height: 32, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}><WineThumb wine={w} height={32} /></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: "#f5f0e8" }}>{w.name}</div>
                            <div style={{ fontSize: 10, color: "#5a4a4a" }}>{w.origin} · {w.category} · {fmt(w.promoPrice||w.price)}</div>
                          </div>
                          {w.promoPrice && <span style={{ fontSize: 9, background: "#b45309", color: "#fef3c7", padding: "1px 6px", borderRadius: 3 }}>-{discountPct(w.price, w.promoPrice)}%</span>}
                        </div>
                      ))}
                    </div>
                  ) : null;
                })()}
              </div>
              {/* Filtro de preço */}
              <div style={{ position: "relative" }}>
                <button onClick={() => setShowPriceFilter(!showPriceFilter)}
                  style={{ padding: "9px 14px", background: (priceRange[0] > 0 || priceRange[1] < 3000) ? "#8b2c2c" : "#1a1410", border: `1px solid ${(priceRange[0] > 0 || priceRange[1] < 3000) ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 4, color: "#f5f0e8", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", whiteSpace: "nowrap" }}>
                  💰 Preço {(priceRange[0] > 0 || priceRange[1] < 3000) ? `· ${fmt(priceRange[0])}–${fmt(priceRange[1])}` : "▾"}
                </button>
                {showPriceFilter && (
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50, background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 10, padding: "18px 18px 14px", minWidth: 240, boxShadow: "0 12px 40px rgba(0,0,0,.5)", animation: "fadeIn .2s ease" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 12 }}>Faixa de Preço</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, color: "#e8b4b4" }}>{fmt(priceRange[0])}</span>
                      <span style={{ fontSize: 12, color: "#e8b4b4" }}>{fmt(priceRange[1])}</span>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 9, color: "#5a4a4a", marginBottom: 4 }}>Mínimo</div>
                      <input type="range" min={0} max={3000} step={50} value={priceRange[0]}
                        onChange={(e) => setPriceRange([Math.min(+e.target.value, priceRange[1] - 50), priceRange[1]])}
                        style={{ width: "100%", accentColor: "#8b2c2c" }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 9, color: "#5a4a4a", marginBottom: 4 }}>Máximo</div>
                      <input type="range" min={0} max={3000} step={50} value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0] + 50)])}
                        style={{ width: "100%", accentColor: "#8b2c2c" }} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setPriceRange([0, 3000]); setShowPriceFilter(false); }}
                        style={{ flex: 1, padding: "7px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: "#7a6a6a", cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif" }}>Limpar</button>
                      <button onClick={() => setShowPriceFilter(false)}
                        style={{ flex: 1, padding: "7px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif" }}>Aplicar</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="cat-btns" style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {CATEGORIES.map((c) => <button key={c} onClick={() => setFilter(c)} style={{ padding: "6px 13px", borderRadius: 4, border: `1px solid ${filter === c ? "#8b2c2c" : "#2a1f1f"}`, background: filter === c ? "#8b2c2c" : "transparent", color: filter === c ? "#fff" : "#a09080", cursor: "pointer", fontSize: 11, letterSpacing: 1, fontFamily: "Georgia,serif", transition: "all .2s" }}>{c}</button>)}
              </div>
              {/* Filtro por País — dinâmico baseado nos vinhos cadastrados */}
              {(() => {
                const countries = ["Todos", ...Array.from(new Set(wines.map(w => w.origin).filter(Boolean).map(o => o.trim()))).sort()];
                if (countries.length <= 2) return null; // só mostra se tiver mais de 1 país
                return (
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap", paddingTop: 4 }}>
                    <span style={{ fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", alignSelf: "center", paddingRight: 4 }}>País</span>
                    {countries.map(c => {
                      const FLAG_MAP = {
                        "Argentina":"🇦🇷","Brasil":"🇧🇷","Brazil":"🇧🇷",
                        "Chile":"🇨🇱","Portugal":"🇵🇹","França":"🇫🇷","France":"🇫🇷",
                        "Itália":"🇮🇹","Italy":"🇮🇹","Espanha":"🇪🇸","Spain":"🇪🇸",
                        "África do Sul":"🇿🇦","South Africa":"🇿🇦","Africa do Sul":"🇿🇦",
                        "EUA":"🇺🇸","USA":"🇺🇸","Estados Unidos":"🇺🇸","United States":"🇺🇸",
                        "Uruguai":"🇺🇾","Uruguay":"🇺🇾",
                        "Austrália":"🇦🇺","Australia":"🇦🇺",
                        "Alemanha":"🇩🇪","Germany":"🇩🇪",
                        "Nova Zelândia":"🇳🇿","New Zealand":"🇳🇿",
                        "Grécia":"🇬🇷","Greece":"🇬🇷",
                        "Hungria":"🇭🇺","Hungary":"🇭🇺","Áustria":"🇦🇹","Austria":"🇦🇹",
                        "Todos":"🌍",
                      };
                      const flag = FLAG_MAP[c] ?? (c === "Todos" ? "🌍" : "🍷");
                      const active = countryFilter === c;
                      return (
                        <button key={c} onClick={() => setCountryFilter(c)}
                          style={{ padding: "5px 12px", borderRadius: 4, border: `1px solid ${active ? "#6b4c9a" : "#2a1f1f"}`, background: active ? "#6b4c9a" : "transparent", color: active ? "#fff" : "#a09080", cursor: "pointer", fontSize: 11, letterSpacing: 1, fontFamily: "Georgia,serif", transition: "all .2s" }}>
                          {flag} {c}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
              {/* Ordenação */}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ padding: "7px 12px", background: sortBy !== "default" ? "#8b2c2c" : "#1a1410", border: `1px solid ${sortBy !== "default" ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 4, color: "#f5f0e8", fontSize: 11, fontFamily: "Georgia,serif", cursor: "pointer" }}>
                <option value="default">Ordenar ▾</option>
                <option value="price_asc">💰 Menor preço</option>
                <option value="price_desc">💎 Maior preço</option>
                <option value="rating">⭐ Melhor avaliação</option>
                <option value="name">🔤 A–Z</option>
              </select>
            </div>
            <div className="catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 18, paddingBottom: 60 }}>
              {catalogLoading
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredWines.map((wine, i) => {
                const activePrice = wine.promoPrice || wine.price;
                const isWishlisted = wishlist.includes(wine.id);
                return (
                  <div key={wine.id} className="wine-card" onClick={() => { setSelectedWine(wine); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 12, overflow: "hidden", animation: `fadeIn .4s ease ${i * .05}s both`, position: "relative", display: "flex", flexDirection: "column" }}>
                    {/* Imagem quadrada 1:1 */}
                    <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                      <WineThumb wine={wine} height="100%" />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 55%,rgba(12,10,9,.8))" }} />
                      {wine.promoPrice && <span style={{ position: "absolute", top: 10, left: 10, background: "#b45309", color: "#fef3c7", fontSize: 9, padding: "2px 8px", borderRadius: 3, fontWeight: "bold", letterSpacing: 1 }}>-{discountPct(wine.price, wine.promoPrice)}%</span>}
                      <span style={{ position: "absolute", top: 10, right: 10, background: "#8b2c2c", color: "#fff", fontSize: 9, padding: "2px 7px", borderRadius: 3 }}>{wine.category}</span>
                      {/* ❤️ Wishlist button */}
                      <button onClick={(e) => toggleWishlist(e, wine.id)}
                        style={{ position: "absolute", bottom: 10, right: 10, background: isWishlisted ? "rgba(139,44,44,.9)" : "rgba(20,14,14,.7)", border: `1px solid ${isWishlisted ? "#8b2c2c" : "rgba(255,255,255,.1)"}`, borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", color: isWishlisted ? "#fff" : "#a09080" }}>
                        {isWishlisted ? "❤️" : "🤍"}
                      </button>
                      <div style={{ position: "absolute", bottom: 10, left: 12 }}>
                        <div style={{ fontSize: 9, color: "rgba(245,240,232,.6)" }}>{wine.origin} · {wine.year}</div>
                      </div>
                    </div>
                    <div style={{ padding: "14px 14px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 className="wc-name" style={{ fontSize: 14, color: "#f5f0e8", marginBottom: 4 }}>{wine.name}</h3>
                      <div style={{ marginBottom: 6 }}><Stars rating={wine.rating} /></div>
                      <p className="wc-desc" style={{ fontSize: 11, color: "#7a6a6a", lineHeight: 1.55, marginBottom: 8, flex: 1 }}>{wine.description?.slice(0, 120)}{wine.description?.length > 120 ? "…" : ""}</p>
                      {/* Low stock badge */}
                      {wine.stock <= 3 && <div style={{ marginBottom: 8 }}><LowStockBadge stock={wine.stock} /></div>}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                        <span className="wc-price" style={{ fontSize: 17, color: wine.promoPrice ? "#fbbf24" : "#e8b4b4", fontWeight: "bold" }}>{fmt(activePrice)}</span>
                        {wine.promoPrice && <span className="wc-old-price" style={{ fontSize: 10, color: "#5a4a4a", textDecoration: "line-through" }}>{fmt(wine.price)}</span>}
                      </div>
                      {wine.promoPrice && (
                        <div style={{ marginBottom: 6 }}>
                          <PromoTimer wineId={wine.id} compact />
                          
                        </div>
                      )}
                      <div className="wc-stock" style={{ fontSize: 9, color: "#5a4a4a", marginBottom: 12 }}>{wine.stock > 0 ? `${wine.stock} em estoque` : ""}</div>
                      <button className="btn-red" onClick={(e) => { e.stopPropagation(); addToCart(wine); }} disabled={wine.stock === 0}
                        style={{ width: "100%", padding: "10px", borderRadius: 4, fontSize: 11, letterSpacing: 1, background: wine.stock === 0 ? "#2a1f1f" : "#8b2c2c", color: wine.stock === 0 ? "#5a4a4a" : "#fff", cursor: wine.stock === 0 ? "not-allowed" : "pointer", marginTop: "auto" }}>
                        {wine.stock === 0 ? "Esgotado" : "🛒 Adicionar ao Carrinho"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 21: CTAs estratégicos — fim do catálogo */}
            <div style={{ padding: "32px 0 60px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* CTA 1: criar conta / pontos */}
              <div style={{ background: "linear-gradient(135deg,#1a0a0a,#2d1010)", border: "1px solid #3a1f1f", borderRadius: 14, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "#8b4040", textTransform: "uppercase", marginBottom: 5 }}>Clube Vinhos9</div>
                  <div style={{ fontSize: 18, color: "#f5f0e8", fontWeight: "bold", marginBottom: 5 }}>🎁 Ganhe 200 pontos no cadastro</div>
                  <div style={{ fontSize: 13, color: "#a09080" }}>Acumule pontos a cada compra e troque por descontos exclusivos</div>
                </div>
                <button className="btn-red" onClick={() => openClientPanel("orders")}
                  style={{ padding: "12px 26px", borderRadius: 6, fontSize: 13, letterSpacing: 1, whiteSpace: "nowrap" }}>
                  Criar Conta Grátis →
                </button>
              </div>
              {/* CTA 2: promoções se houver */}
              {promoWines.length > 0 && (
                <div style={{ background: "linear-gradient(135deg,#1a1000,#2a1a00)", border: "1px solid #3a2a00", borderRadius: 14, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: "#b45309", textTransform: "uppercase", marginBottom: 5 }}>Ofertas com prazo</div>
                    <div style={{ fontSize: 18, color: "#fbbf24", fontWeight: "bold", marginBottom: 5 }}>🏷 {promoWines.length} vinhos em promoção</div>
                    <div style={{ fontSize: 13, color: "#a09080" }}>Descontos especiais por tempo limitado — aproveite!</div>
                  </div>
                  <button onClick={() => document.getElementById("promocoes")?.scrollIntoView({ behavior: "smooth" })}
                    style={{ padding: "12px 26px", borderRadius: 6, fontSize: 13, letterSpacing: 1, background: "#b45309", border: "none", color: "#fff", cursor: "pointer", fontFamily: "Georgia,serif", whiteSpace: "nowrap" }}>
                    Ver Promoções →
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
      {page === "store" && selectedWine && (
        <div style={{ animation: "slideUp .4s ease" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, fontSize: 11, color: "#5a4a4a" }}>
              <span onClick={() => setSelectedWine(null)} style={{ cursor: "pointer", color: "#8b6060" }}>Loja</span>
              <span>›</span>
              <span onClick={() => { setSelectedWine(null); setFilter(selectedWine.category); }} style={{ cursor: "pointer", color: "#8b6060" }}>{selectedWine.category}</span>
              <span>›</span>
              <span style={{ color: "#a09080" }}>{selectedWine.name}</span>
            </div>
            <button onClick={() => setSelectedWine(null)} style={{ background: "none", border: "none", color: "#8b6060", cursor: "pointer", fontSize: 12, letterSpacing: 1, marginBottom: 26, display: "flex", alignItems: "center", gap: 6, fontFamily: "Georgia,serif" }}>← Voltar ao catálogo</button>
            <div className="detail-flex" style={{ display: "flex", gap: 44, alignItems: "flex-start" }}>
              {/* Imagem — grande no desktop, full width no mobile */}
              <div className="detail-img" style={{ width: 480, flexShrink: 0, aspectRatio: "1/1", borderRadius: 14, overflow: "hidden", border: "1px solid #2a1f1f", position: "relative", cursor: "zoom-in" }} onClick={() => setZoomWine(selectedWine)}>
                <WineThumb wine={selectedWine} height="100%" />
                {selectedWine.promoPrice && (
                  <div style={{ position: "absolute", top: 14, left: 14, background: "#b45309", color: "#fef3c7", fontSize: 13, padding: "5px 12px", borderRadius: 6, fontWeight: "bold", letterSpacing: 1 }}>
                    -{discountPct(selectedWine.price, selectedWine.promoPrice)}% OFF
                  </div>
                )}
                <span style={{ position: "absolute", top: 14, right: 14, background: "#8b2c2c", color: "#fff", fontSize: 9, padding: "3px 9px", borderRadius: 3, letterSpacing: 1 }}>{selectedWine.category}</span>
                <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,.5)", borderRadius: 4, padding: "3px 7px", fontSize: 9, color: "#a09080" }}>🔍 Clique para ampliar</div>
              </div>
              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase", marginBottom: 6 }}>{selectedWine.origin} · {selectedWine.region}</p>
                <h1 style={{ fontSize: 22, color: "#f5f0e8", marginBottom: 8, lineHeight: 1.3 }}>{selectedWine.name}</h1>
                <div style={{ marginBottom: 14 }}><Stars rating={selectedWine.rating} /></div>
                <p style={{ fontSize: 12, color: "#a09080", lineHeight: 1.75, marginBottom: 20 }}>{selectedWine.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
                  {[["🗓 Safra", selectedWine.year], ["🍇 Uvas", selectedWine.grapes], ["🌍 Região", selectedWine.region], ["🍾 Teor Alcoólico", selectedWine.alcohol]].map(([label, val]) => (
                    <div key={label} style={{ background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 8, padding: "10px 13px" }}>
                      <div style={{ fontSize: 9, color: "#5a4a4a", letterSpacing: 1, marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 12, color: "#f5f0e8" }}>{val || "—"}</div>
                    </div>
                  ))}
                </div>
                {/* Preço */}
                <div style={{ background: selectedWine.promoPrice ? "linear-gradient(135deg,#1e1500,#150e00)" : "#1a1410", border: `1px solid ${selectedWine.promoPrice ? "#3a2a00" : "#2a1f1f"}`, borderRadius: 10, padding: "16px 18px", marginBottom: 18 }}>
                  {selectedWine.promoPrice ? (
                    <div>
                      <div style={{ fontSize: 10, color: "#b45309", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>🏷 Preço Promocional</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                        <span style={{ fontSize: 30, color: "#fbbf24", fontWeight: "bold" }}>{fmt(selectedWine.promoPrice)}</span>
                        <span style={{ fontSize: 16, color: "#5a4a4a", textDecoration: "line-through" }}>{fmt(selectedWine.price)}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#b45309", marginBottom: 10 }}>Você economiza {fmt(selectedWine.price - selectedWine.promoPrice)} ({discountPct(selectedWine.price, selectedWine.promoPrice)}% de desconto)</div>
                      <PromoTimer wineId={selectedWine.id} />
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 28, color: "#e8b4b4", fontWeight: "bold", marginBottom: 4 }}>{fmt(selectedWine.price)}</div>
                      <div style={{ fontSize: 9, color: "#5a4a4a", marginBottom: 0 }}>{selectedWine.stock} unidades em estoque</div>
                    </div>
                  )}
                  {/* Descontos Pix / Boleto */}
                  {(payDescontos.pix > 0 || payDescontos.boleto > 0) && (
                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {payDescontos.pix > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.25)", borderRadius: 6, padding: "6px 11px" }}>
                          <span style={{ fontSize: 13 }}>⚡</span>
                          <div>
                            <div style={{ fontSize: 10, color: "#4ade80", fontWeight: "bold" }}>{payDescontos.pix}% OFF no Pix</div>
                            <div style={{ fontSize: 10, color: "#4ade80" }}>{fmt((selectedWine.promoPrice || selectedWine.price) * (1 - payDescontos.pix / 100))}</div>
                          </div>
                        </div>
                      )}
                      {payDescontos.boleto > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(251,191,36,.08)", border: "1px solid rgba(251,191,36,.25)", borderRadius: 6, padding: "6px 11px" }}>
                          <span style={{ fontSize: 13 }}>📄</span>
                          <div>
                            <div style={{ fontSize: 10, color: "#fbbf24", fontWeight: "bold" }}>{payDescontos.boleto}% OFF no Boleto</div>
                            <div style={{ fontSize: 10, color: "#fbbf24" }}>{fmt((selectedWine.promoPrice || selectedWine.price) * (1 - payDescontos.boleto / 100))}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Parcelamento 3x */}
                {(() => { const preco = selectedWine.promoPrice || selectedWine.price; return preco >= 399 ? (
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, background:"linear-gradient(135deg,#0e1a0e,#0a1408)", border:"1px solid #1e3a1e", borderRadius:8, padding:"10px 14px" }}>
                    <span style={{ fontSize:20 }}>💳</span>
                    <div>
                      <div style={{ fontSize:13, color:"#4ade80", fontWeight:"bold" }}>3x de {fmt(preco/3)} sem juros no cartão</div>
                      <div style={{ fontSize:10, color:"#3a6a3a", marginTop:2 }}>Parcelamento disponível para pedidos acima de R$ 399,00</div>
                    </div>
                  </div>
                ) : null; })()}
                {/* Low stock */}
                {selectedWine.stock <= 3 && <div style={{ marginBottom: 14 }}><LowStockBadge stock={selectedWine.stock} /></div>}
                {/* Botões ação */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                  <button className="btn-red" onClick={() => addToCart(selectedWine)} disabled={selectedWine.stock === 0} style={{ padding: "13px 28px", borderRadius: 4, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", background: selectedWine.stock === 0 ? "#2a1f1f" : "#8b2c2c", color: selectedWine.stock === 0 ? "#5a4a4a" : "#fff", cursor: selectedWine.stock === 0 ? "not-allowed" : "pointer" }}>
                    {selectedWine.stock === 0 ? "Esgotado" : "🛒 Adicionar ao Carrinho"}
                  </button>
                  {/* Favorito */}
                  <button onClick={(e) => toggleWishlist(e, selectedWine.id)}
                    style={{ padding: "13px 18px", borderRadius: 4, border: `1px solid ${wishlist.includes(selectedWine.id) ? "#8b2c2c" : "#2a1f1f"}`, background: wishlist.includes(selectedWine.id) ? "rgba(139,44,44,.2)" : "#1a1410", color: wishlist.includes(selectedWine.id) ? "#e8b4b4" : "#7a6a6a", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", transition: "all .2s" }}
                    title={wishlist.includes(selectedWine.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
                    {wishlist.includes(selectedWine.id) ? "❤️" : "🤍"}
                  </button>
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/5542998493579?text=${encodeURIComponent(`Olá! Tenho interesse no *${selectedWine.name}* (${selectedWine.year}) por ${fmt(selectedWine.promoPrice || selectedWine.price)}. Poderia me ajudar?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 22px", borderRadius: 4, background: "#15803d", color: "#fff", textDecoration: "none", fontSize: 12, letterSpacing: 1, fontFamily: "Georgia,serif", fontWeight: "bold", transition: "background .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#166534"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#15803d"}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Falar no WhatsApp
                  </a>
                </div>

                {/* Calculadora de Frete */}
                <FreteCalculator wine={selectedWine} />

                {/* 🍷 Sommelier Virtual IA */}
                <SommelierWidget wine={selectedWine} />

                {/* 13-16: Botões de informação do produto */}
                <div style={{ marginTop: 16 }}>
                  {/* Linha de botões */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                    {[
                      { key: "pagamento", icon: "💳", label: "Pagamento" },
                      { key: "termos",    icon: "📄", label: "Termos" },
                      { key: "troca",     icon: "🔄", label: "Trocas" },
                      { key: "garantia",  icon: "✅", label: "Garantia" },
                      { key: "faq",       icon: "❓", label: "FAQ" },
                      { key: "privacidade", icon: "🔒", label: "Privacidade" },
                      { key: "rastreamento", icon: "📦", label: "Rastrear Pedido" },
                    ].map(({ key, icon, label }) => (
                      <button key={key}
                        onClick={() => setOpenInfoModal(openInfoModal === key ? null : key)}
                        style={{ padding: "8px 14px", background: openInfoModal === key ? "rgba(139,44,44,.2)" : "#1a1410", border: `1px solid ${openInfoModal === key ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 6, color: openInfoModal === key ? "#e8b4b4" : "#a09080", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", transition: "all .2s", display: "flex", alignItems: "center", gap: 5 }}>
                        {icon} {label}
                      </button>
                    ))}
                  </div>

                  {/* 16: Painel — Formas de Pagamento */}
                  {openInfoModal === "pagamento" && (
                    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "16px 18px", marginBottom: 8, animation: "fadeIn .2s ease" }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 12 }}>💳 Formas de Pagamento & Descontos</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {[
                          { icon: "⚡", label: "Pix",              desc: "Aprovação imediata",        pctKey: "pix",       color: "#4ade80" },
                          { icon: "📄", label: "Boleto Bancário",   desc: "Vence em 3 dias úteis",    pctKey: "boleto",    color: "#fbbf24" },
                          { icon: "💳", label: "Cartão 1x",         desc: "Sem acréscimos",            pctKey: "credito1x", color: "#e8b4b4" },
                          { icon: "💳", label: "Cartão até 12x",    desc: "Juros do cartão",           pctKey: null,        color: "#a09080" },
                        ].map(({ icon, label, desc, pctKey, color }) => {
                          const pct = pctKey ? (payDescontos[pctKey] || 0) : 0;
                          const preco = selectedWine.promoPrice || selectedWine.price;
                          return (
                            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: "#120e0c", borderRadius: 8, border: "1px solid #2a1f1f" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 16 }}>{icon}</span>
                                <div>
                                  <div style={{ fontSize: 13, color: "#f5f0e8" }}>{label}</div>
                                  <div style={{ fontSize: 10, color: "#7a6a6a" }}>{desc}</div>
                                </div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                {pct > 0 ? (
                                  <>
                                    <div style={{ fontSize: 12, color, fontWeight: "bold" }}>−{pct}% OFF</div>
                                    <div style={{ fontSize: 13, color: "#4ade80", fontWeight: "bold" }}>{fmt(preco * (1 - pct / 100))}</div>
                                  </>
                                ) : (
                                  <div style={{ fontSize: 13, color: "#a09080" }}>{fmt(preco)}</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ marginTop: 10, fontSize: 11, color: "#5a4a4a", lineHeight: 1.6 }}>
                        🔒 Pagamentos via <strong style={{ color: "#a09080" }}>Mercado Pago</strong> — não armazenamos dados do seu cartão.
                      </div>
                    </div>
                  )}

                  {/* 13: Painel — Termos e Condições */}
                  {openInfoModal === "termos" && (
                    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "16px 18px", marginBottom: 8, animation: "fadeIn .2s ease", maxHeight: 280, overflowY: "auto" }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 12 }}>📄 Termos e Condições de Venda</div>
                      {[
                        ["🔞 Maiores de 18 anos", "A venda de bebidas alcoólicas é exclusiva para maiores de 18 anos, conforme a Lei nº 9.294/96. Ao finalizar a compra, você confirma ter a idade mínima exigida."],
                        ["📦 Entrega", "Entregas realizadas em todo o Brasil via PAC, SEDEX ou transportadora parceira. Prazos contados após confirmação do pagamento."],
                        ["↩️ Cancelamento", "Pedidos podem ser cancelados em até 7 dias após a entrega, conforme o Código de Defesa do Consumidor (Lei nº 8.078/90), desde que o produto esteja lacrado."],
                        ["⚖️ Responsabilidade", "A Vinhos9 não se responsabiliza por divergências causadas por informações incorretas fornecidas pelo cliente no ato da compra."],
                        ["🔐 LGPD", "Seus dados pessoais são tratados conforme a Lei nº 13.709/2018 (LGPD), utilizados apenas para processamento e entrega do pedido."],
                      ].map(([titulo, texto]) => (
                        <div key={titulo} style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 12, color: "#e8b4b4", fontWeight: "bold", marginBottom: 3 }}>{titulo}</div>
                          <div style={{ fontSize: 12, color: "#8a7a7a", lineHeight: 1.7 }}>{texto}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 14: Painel — Política de Troca */}
                  {openInfoModal === "troca" && (
                    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "16px 18px", marginBottom: 8, animation: "fadeIn .2s ease" }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 12 }}>🔄 Política de Troca e Devolução</div>
                      {[
                        ["✅ Quando aceitamos", "Produto entregue danificado, rótulo trocado ou com defeito de fábrica. Aceitamos devoluções em até 7 dias após o recebimento."],
                        ["📸 Como solicitar", "Fotografe o produto e entre em contato via WhatsApp ou e-mail com o número do pedido. Nossa equipe responde em até 24h úteis."],
                        ["💰 Reembolso", "Reembolso pela mesma forma de pagamento usada na compra, em até 10 dias úteis após aprovação."],
                        ["❌ Exceções", "Não aceitamos trocas de produtos abertos ou consumidos, salvo comprovação de defeito."],
                      ].map(([titulo, texto]) => (
                        <div key={titulo} style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 12, color: "#e8b4b4", fontWeight: "bold", marginBottom: 3 }}>{titulo}</div>
                          <div style={{ fontSize: 12, color: "#8a7a7a", lineHeight: 1.7 }}>{texto}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 15: Painel — Garantia de Originalidade */}
                  {openInfoModal === "garantia" && (
                    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid rgba(74,222,128,.3)", borderRadius: 10, padding: "16px 18px", marginBottom: 8, animation: "fadeIn .2s ease" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <div style={{ fontSize: 28 }}>🏅</div>
                        <div>
                          <div style={{ fontSize: 13, color: "#4ade80", fontWeight: "bold" }}>Garantia de Originalidade Vinhos9</div>
                          <div style={{ fontSize: 11, color: "#86efac" }}>100% importado e certificado</div>
                        </div>
                      </div>
                      {[
                        ["🍇 Origem certificada", "Todos os rótulos são importados diretamente de vinícolas parceiras ou distribuidores autorizados, com nota fiscal e documentação de importação."],
                        ["🔍 Curadoria rigorosa", "Cada lote passa por inspeção de selos, rolhas e condições de transporte antes de chegar ao cliente."],
                        ["📜 Rastreabilidade", "Mantemos registro completo de origem para todos os produtos. Trabalhamos apenas com fornecedores certificados."],
                        ["💯 Garantia total", "Se você suspeitar de adulteração, devolvemos seu dinheiro integralmente, sem questionamentos."],
                      ].map(([titulo, texto]) => (
                        <div key={titulo} style={{ marginBottom: 10 }}>
                          <div style={{ fontSize: 12, color: "#e8b4b4", fontWeight: "bold", marginBottom: 3 }}>{titulo}</div>
                          <div style={{ fontSize: 12, color: "#8a7a7a", lineHeight: 1.7 }}>{texto}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {openInfoModal === "faq" && (
                    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "16px 18px", marginBottom: 8, animation: "fadeIn .2s ease" }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>❓ Perguntas Frequentes</div>
                      {[
                        ["Qual o prazo de entrega?", "O prazo varia de 3 a 10 dias úteis dependendo da sua região. Após o pagamento confirmado, você recebe o código de rastreamento por e-mail."],
                        ["Como faço o pagamento?", "Aceitamos Pix (5% de desconto), boleto bancário (3% de desconto) e cartão de crédito em até 3x sem juros para compras acima de R$ 399."],
                        ["Os vinhos têm nota fiscal?", "Por enquanto utilizamos declaração de conteúdo para minimizar os custos de envio ao cliente. Todos os produtos são devidamente registrados e rastreáveis."],
                        ["Posso devolver um produto?", "Sim, aceitamos trocas e devoluções em até 7 dias após o recebimento, conforme o Código de Defesa do Consumidor."],
                        ["Como embalo os vinhos para envio?", "Utilizamos embalagens especiais com proteção individual para cada garrafa, garantindo que chegue sem danos."],
                        ["O site é seguro para comprar?", "Sim! Utilizamos criptografia SSL e todos os dados são protegidos conforme a LGPD."],
                        ["Vocês entregam em todo Brasil?", "Sim, entregamos para todo o território nacional via transportadoras parceiras e Correios."],
                        ["Posso comprar como presente?", "Sim! Informe no campo de observações do pedido e incluímos uma cartinha personalizada sem custo adicional."],
                      ].map(([p, r]) => (
                        <div key={p} style={{ marginBottom: 14, borderBottom: "1px solid #1a1510", paddingBottom: 12 }}>
                          <div style={{ fontSize: 12, color: "#e8b4b4", fontWeight: "bold", marginBottom: 5 }}>🍷 {p}</div>
                          <div style={{ fontSize: 12, color: "#8a7a7a", lineHeight: 1.7 }}>{r}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {openInfoModal === "privacidade" && (
                    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "16px 18px", marginBottom: 8, animation: "fadeIn .2s ease" }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>🔒 Política de Privacidade</div>
                      <div style={{ fontSize: 11, color: "#5a4a4a", marginBottom: 12 }}>Última atualização: Janeiro de 2025 — Em conformidade com a LGPD (Lei nº 13.709/2018)</div>
                      {[
                        ["Quais dados coletamos?", "Coletamos nome, e-mail, telefone, CPF e endereço de entrega fornecidos no momento da compra. Também coletamos dados de navegação como IP e cookies para melhorar sua experiência."],
                        ["Como usamos seus dados?", "Seus dados são usados exclusivamente para processar pedidos, enviar atualizações de entrega, emitir nota fiscal e, com seu consentimento, enviar promoções por e-mail."],
                        ["Compartilhamos seus dados?", "Compartilhamos apenas com transportadoras parceiras (para entrega) e processadores de pagamento. Nunca vendemos seus dados a terceiros."],
                        ["Por quanto tempo guardamos?", "Dados de pedidos são mantidos por 5 anos conforme exigência fiscal. Você pode solicitar a exclusão dos demais dados a qualquer momento."],
                        ["Seus direitos (LGPD)?", "Você tem direito de acessar, corrigir, excluir ou portar seus dados. Para exercer seus direitos, entre em contato via WhatsApp ou e-mail."],
                        ["Cookies?", "Usamos cookies essenciais para funcionamento do site e cookies de análise (anônimos) para melhorar a experiência. Você pode desativá-los no seu navegador."],
                        ["Contato do DPO?", "Encarregado de Proteção de Dados: contato@vinhos9.com.br — Respondemos em até 15 dias úteis."],
                      ].map(([titulo, texto]) => (
                        <div key={titulo} style={{ marginBottom: 12, borderBottom: "1px solid #1a1510", paddingBottom: 10 }}>
                          <div style={{ fontSize: 12, color: "#e8b4b4", fontWeight: "bold", marginBottom: 4 }}>{titulo}</div>
                          <div style={{ fontSize: 12, color: "#8a7a7a", lineHeight: 1.7 }}>{texto}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {openInfoModal === "rastreamento" && (
                    <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "16px 18px", marginBottom: 8, animation: "fadeIn .2s ease" }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>📦 Rastrear Pedido</div>
                      <p style={{ fontSize: 12, color: "#7a6a6a", marginBottom: 16, lineHeight: 1.7 }}>Cole o código de rastreamento enviado por e-mail após o envio do seu pedido.</p>
                      <TrackingWidget />
                    </div>
                  )}
                </div>

                {/* Harmonização */}
                <div style={{ background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 10, padding: "18px 20px", marginTop: 14 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase", marginBottom: 10 }}>🍽 Harmonização</div>
                  <p style={{ fontSize: 11, color: "#5a4a4a", marginBottom: 12 }}>Este {selectedWine.category.toLowerCase()} combina com:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(selectedWine.harmonization
                      ? selectedWine.harmonization.split(",").map(s => s.trim()).filter(Boolean)
                      : (HARMONIZATION[selectedWine.category] || [])
                    ).map(item => (
                      <span key={item} style={{ background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#e8b4b4" }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Avaliações */}
            <ReviewSection wine={selectedWine} reviews={reviews} setReviews={setReviews} reviewedWines={reviewedWines} setReviewedWines={setReviewedWines} onSubmitReview={dbInsertReview} />

            {/* Carrossel — mesma categoria */}
            {relatedWines.length > 0 && (
              <Carousel
                items={relatedWines}
                title={`Outros ${selectedWine.category}s`}
                subtitle="Você também pode gostar"
                accentColor="#e8b4b4"
                autoPlay={true}
                visibleDesktop={3}
                fadeMode={true}
                onSelect={(wine) => { setSelectedWine(wine); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              />
            )}

            {/* Carrossel — em promoção (4 itens, animação slide padrão) */}
            {promoWines.filter((w) => w.id !== selectedWine.id).length > 0 && (
              <div style={{ marginTop: 0, paddingTop: 0 }}>
                <Carousel
                  items={promoWines.filter((w) => w.id !== selectedWine.id)}
                  title="🏷 Em Promoção"
                  subtitle="Não perca"
                  accentColor="#fbbf24"
                  autoPlay={true}
                  visibleDesktop={4}
                  fadeMode={false}
                  onSelect={(wine) => { setSelectedWine(wine); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CARRINHO ── */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.72)", backdropFilter: "blur(4px)" }} />
          <div className="cart-panel" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 390, background: "#140e0e", borderLeft: "1px solid #2a1f1f", animation: "slideIn .3s ease", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid #2a1f1f", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 15, letterSpacing: 2 }}>🛒 Carrinho ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#a09080", cursor: "pointer", fontSize: 17 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", color: "#5a4a4a", marginTop: 60 }}>
                  <div style={{ width: 60, height: 60, margin: "0 auto 12px", borderRadius: 8, overflow: "hidden" }}><BottlePlaceholder size={60} /></div>
                  <p style={{ fontSize: 12 }}>Carrinho vazio</p>
                </div>
              ) : cart.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 10, marginBottom: 11, padding: 11, background: item.promoPrice ? "linear-gradient(135deg,#1e1505,#160e03)" : "#1a1410", borderRadius: 8, border: `1px solid ${item.promoPrice ? "#3a2a10" : "#2a1f1f"}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}><WineThumb wine={item} height={44} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 2 }}>{item.name}</div>
                    {item.promoPrice && <div style={{ marginBottom: 4 }}><PromoTimer wineId={item.id} compact /></div>}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <button onClick={() => updateCartQty(item.id, -1)} style={{ width: 22, height: 22, background: "#2a1f1f", border: "none", borderRadius: 3, color: "#e8b4b4", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: 12, color: "#f5f0e8", minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} style={{ width: 22, height: 22, background: "#2a1f1f", border: "none", borderRadius: 3, color: "#e8b4b4", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      <span style={{ fontSize: 10, color: item.promoPrice ? "#fbbf24" : "#8b6060", marginLeft: 4 }}>{fmt(item.promoPrice || item.price)} × {item.qty}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#e8b4b4", fontWeight: "bold", fontSize: 12 }}>{fmt((item.promoPrice || item.price) * item.qty)}</div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif" }}>remover</button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: "16px 18px", borderTop: "1px solid #2a1f1f" }}>

                {/* ── 10+11: Seleção de Frete com ViaCEP ── */}
                <CartFreteSelector
                  freteConfig={freteConfig}
                  cartTotal={cartTotal - discountAmt}
                  freteEscolhido={freteEscolhido}
                  setFreteEscolhido={setFreteEscolhido}
                  onCepFill={(addr) => setCheckoutData(p => ({ ...p, ...addr }))}
                />

                {/* Cupom */}
                {!appliedCoupon ? (
                  <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
                    <input value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      placeholder="Cupom de desconto"
                      style={{ flex: 1, background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "8px 11px", color: "#f5f0e8", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1 }} />
                    <button onClick={handleApplyCoupon}
                      style={{ padding: "8px 12px", background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 4, color: "#e8b4b4", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                      🎁
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "7px 11px", background: "rgba(74,222,128,.07)", border: "1px solid rgba(74,222,128,.2)", borderRadius: 6 }}>
                    <span style={{ fontSize: 11, color: "#4ade80" }}>🎁 {appliedCoupon} −{couponPct(appliedCoupon)}%</span>
                    <button onClick={() => { setAppliedCoupon(null); setCouponInput(""); }} style={{ background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 10 }}>✕</button>
                  </div>
                )}

                {/* Totais */}
                <div style={{ fontSize: 12, color: "#7a6a6a", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                  <span>Subtotal</span><span>{fmt(cartTotal)}</span>
                </div>
                {appliedCoupon && (
                  <div style={{ fontSize: 12, color: "#4ade80", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                    <span>Desconto</span><span>−{fmt(discountAmt)}</span>
                  </div>
                )}
                {freteEscolhido && (
                  <div style={{ fontSize: 12, color: freteEscolhido.base === 0 ? "#4ade80" : "#a09080", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                    <span>Frete ({freteEscolhido.nome})</span>
                    <span>{freteEscolhido.base === 0 ? "Grátis 🎉" : fmt(freteEscolhido.base)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #2a1f1f", marginBottom: 14 }}>
                  <span style={{ color: "#f5f0e8", fontSize: 14 }}>Total</span>
                  <span style={{ fontSize: 20, color: "#e8b4b4", fontWeight: "bold" }}>{fmt(cartFinal)}</span>
                </div>
                <button className="btn-red" onClick={() => { setCartOpen(false); setCheckoutStep(1); setCheckoutOpen(true); }}
                  style={{ width: "100%", padding: "12px", borderRadius: 4, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
                  Finalizar Pedido →
                </button>
                <div style={{ fontSize: 9, color: "#3a2a2a", textAlign: "center", marginTop: 8 }}>🔒 Pagamento seguro via Mercado Pago</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SOBRE ── */}
      {page === "about" && (
        <main style={{ animation: "fadeIn .4s ease", maxWidth: 860, margin: "0 auto", padding: "52px 24px 80px" }}>
          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: "#8b6060", textTransform: "uppercase", marginBottom: 10 }}>Nossa História</div>
            <h1 style={{ fontSize: 36, color: "#e8b4b4", marginBottom: 16, lineHeight: 1.2 }}>Uma paixão pelo vinho<br />que virou missão</h1>
            <p style={{ color: "#a09080", fontSize: 15, lineHeight: 1.9, maxWidth: 560, margin: "0 auto" }}>
              A Vinhos9 nasceu em 2018 da obsessão de dois sommeliers brasileiros por vinhos que contam histórias — garrafas que carregam a alma de seus terroirs e a dedicação de quem as faz.
            </p>
          </div>

          {/* Linha do tempo */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Nossa Trajetória</div>
            {[
              { year: "2018", title: "O começo", desc: "Fundada em São Paulo com apenas 12 rótulos cuidadosamente selecionados em viagens pela Europa e América do Sul." },
              { year: "2020", title: "Expansão do portfólio", desc: "Chegamos a 80 rótulos e firmamos parcerias diretas com vinícolas na França, Itália, Argentina e Chile." },
              { year: "2022", title: "Reconhecimento", desc: "Premiados como 'Melhor Importadora Boutique' pela Revista Adega. Mais de 2.000 clientes satisfeitos." },
              { year: "2024", title: "Loja online", desc: "Lançamos nossa plataforma digital para levar vinhos excepcionais a todo o Brasil, com entrega temperada." },
              { year: "2026", title: "Hoje", desc: "Mais de 120 rótulos exclusivos, curadoria mensal e um clube de assinatura com 500 membros ativos." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 24, marginBottom: 28, alignItems: "flex-start" }}>
                <div style={{ minWidth: 60, textAlign: "right" }}>
                  <span style={{ fontSize: 13, color: "#8b2c2c", fontWeight: "bold" }}>{item.year}</span>
                </div>
                <div style={{ width: 1, background: "#2a1f1f", alignSelf: "stretch", position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#8b2c2c", position: "absolute", top: 4, left: -4 }} />
                </div>
                <div style={{ paddingBottom: 4 }}>
                  <div style={{ fontSize: 14, color: "#f5f0e8", fontWeight: "bold", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#7a6a6a", lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Valores */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "#8b6060", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Por que a Vinhos9</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 18 }}>
              {[
                { icon: "🍇", title: "Curadoria Rigorosa", desc: "Cada rótulo é provado e aprovado pelos nossos sommeliers antes de entrar no catálogo." },
                { icon: "🌡", title: "Entrega Climatizada", desc: "Embalagem especial que mantém a temperatura ideal do vinho durante todo o transporte." },
                { icon: "🤝", title: "Parcerias Diretas", desc: "Compramos diretamente das vinícolas, garantindo autenticidade e melhor preço." },
                { icon: "📚", title: "Conhecimento", desc: "Cada vinho acompanha ficha técnica detalhada com sugestões de harmonização." },
              ].map((v) => (
                <div key={v.title} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 12, padding: "22px 20px" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{v.icon}</div>
                  <div style={{ fontSize: 14, color: "#e8b4b4", fontWeight: "bold", marginBottom: 8 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.7 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", padding: "40px 24px", background: "linear-gradient(135deg,#1a0505,#2d0f0f)", borderRadius: 16, border: "1px solid #3a1f1f" }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🍷</div>
            <h2 style={{ fontSize: 22, color: "#e8b4b4", marginBottom: 10 }}>Explore nosso catálogo</h2>
            <p style={{ color: "#7a6a6a", fontSize: 13, marginBottom: 22, lineHeight: 1.7 }}>Encontre o vinho perfeito para cada momento especial.</p>
            <button className="btn-red" onClick={() => { setPage("store"); setSelectedWine(null); }} style={{ padding: "12px 32px", borderRadius: 4, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
              Ver Catálogo Completo
            </button>
          </div>
        </main>
      )}

      {/* ── CHECKOUT ── */}
      {checkoutOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={() => { if (checkoutStep !== 3) setCheckoutOpen(false); }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.82)", backdropFilter: "blur(5px)" }} />
          <div style={{ position: "relative", background: "#140e0e", border: "1px solid #2a1f1f", borderRadius: 16, padding: "28px 28px 24px", width: "100%", maxWidth: 500, maxHeight: "92vh", overflowY: "auto", animation: "slideUp .3s ease" }}>

            {/* Passo 1 — Dados do cliente */}
            {checkoutStep === 1 && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <h2 style={{ fontSize: 17, color: "#e8b4b4", letterSpacing: 1 }}>🧾 Finalizar Pedido</h2>
                  <button onClick={() => setCheckoutOpen(false)} style={{ background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 18 }}>✕</button>
                </div>
                <p style={{ fontSize: 10, color: "#5a4a4a", letterSpacing: 2, textTransform: "uppercase", marginBottom: 22 }}>Passo 1 de 2 · Seus Dados</p>

                {/* Progresso */}
                <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                  {[1,2].map((s) => <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= checkoutStep ? "#8b2c2c" : "#2a1f1f", transition: "background .3s" }} />)}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
                  {/* Nome */}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Nome Completo <span style={{ color: "#8b2c2c" }}>*</span></label>
                    <input value={checkoutData.nome} onChange={(e) => setCheckoutData(p => ({ ...p, nome: e.target.value }))} placeholder="Ex: Maria da Silva"
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  {/* CPF */}
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>CPF <span style={{ color: "#8b2c2c" }}>*</span></label>
                    <input value={checkoutData.cpf} onChange={(e) => {
                      const d = e.target.value.replace(/\D/g,"").slice(0,11);
                      const fmt = d.length > 9 ? d.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/,"$1.$2.$3-$4")
                        : d.length > 6 ? d.replace(/(\d{3})(\d{3})(\d{1,3})/,"$1.$2.$3")
                        : d.length > 3 ? d.replace(/(\d{3})(\d{1,3})/,"$1.$2") : d;
                      setCheckoutData(p => ({ ...p, cpf: fmt }));
                    }} placeholder="000.000.000-00" maxLength={14}
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  {/* Contato */}
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>WhatsApp / Telefone <span style={{ color: "#8b2c2c" }}>*</span></label>
                    <input value={checkoutData.contato} onChange={(e) => {
                      const d = e.target.value.replace(/\D/g,"").slice(0,11);
                      const fmt = d.length > 6 ? d.replace(/(\d{2})(\d{5})(\d{1,4})/,"($1) $2-$3")
                        : d.length > 2 ? d.replace(/(\d{2})(\d+)/,"($1) $2") : d;
                      setCheckoutData(p => ({ ...p, contato: fmt }));
                    }} placeholder="(11) 99999-9999" maxLength={15}
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>

                  {/* Divisor endereço */}
                  <div style={{ gridColumn: "1/-1", borderTop: "1px solid #2a1f1f", paddingTop: 16, marginTop: 4 }}>
                    <div style={{ fontSize: 9, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase", marginBottom: 14 }}>📦 Endereço de Entrega</div>
                  </div>

                  {/* CEP */}
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>CEP <span style={{ color: "#8b2c2c" }}>*</span></label>
                    <input value={checkoutData.cep} onChange={(e) => {
                      const d = e.target.value.replace(/\D/g,"").slice(0,8);
                      setCheckoutData(p => ({ ...p, cep: d.length > 5 ? d.slice(0,5)+"-"+d.slice(5) : d }));
                    }} placeholder="00000-000" maxLength={9}
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  {/* UF */}
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Estado (UF)</label>
                    <input value={checkoutData.uf} onChange={(e) => setCheckoutData(p => ({ ...p, uf: e.target.value.toUpperCase().slice(0,2) }))} placeholder="SP" maxLength={2}
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  {/* Rua */}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Rua / Avenida <span style={{ color: "#8b2c2c" }}>*</span></label>
                    <input value={checkoutData.rua} onChange={(e) => setCheckoutData(p => ({ ...p, rua: e.target.value }))} placeholder="Rua das Videiras"
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  {/* Número + Complemento */}
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Número <span style={{ color: "#8b2c2c" }}>*</span></label>
                    <input value={checkoutData.numero} onChange={(e) => setCheckoutData(p => ({ ...p, numero: e.target.value }))} placeholder="123"
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Complemento</label>
                    <input value={checkoutData.complemento} onChange={(e) => setCheckoutData(p => ({ ...p, complemento: e.target.value }))} placeholder="Apto 42"
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  {/* Bairro + Cidade */}
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Bairro</label>
                    <input value={checkoutData.bairro} onChange={(e) => setCheckoutData(p => ({ ...p, bairro: e.target.value }))} placeholder="Jardim Europa"
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>Cidade <span style={{ color: "#8b2c2c" }}>*</span></label>
                    <input value={checkoutData.cidade} onChange={(e) => setCheckoutData(p => ({ ...p, cidade: e.target.value }))} placeholder="São Paulo"
                      style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                  </div>
                </div>

                <button onClick={() => {
                  if (!checkoutData.nome || !checkoutData.cpf || !checkoutData.contato || !checkoutData.rua || !checkoutData.numero || !checkoutData.cidade)
                    return showToast("Preencha todos os campos obrigatórios (*).", "error");
                  if (!validarCPF(checkoutData.cpf))
                    return showToast("CPF inválido. Verifique o número informado.", "error");
                  setCheckoutStep(2);
                }} style={{ width: "100%", marginTop: 20, padding: "13px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 2, textTransform: "uppercase" }}>
                  Revisar Pedido →
                </button>

                {/* 12: Aviso de segurança LGPD + Mercado Pago */}
                <div style={{ marginTop: 16, background: "linear-gradient(135deg,rgba(16,30,20,.9),rgba(10,20,30,.9))", border: "1px solid rgba(74,222,128,.2)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>🔐</span>
                    <div>
                      <div style={{ fontSize: 12, color: "#4ade80", fontWeight: "bold", marginBottom: 3 }}>Seus dados estão protegidos</div>
                      <div style={{ fontSize: 11, color: "#86efac", lineHeight: 1.6 }}>
                        Informações coletadas somente para entrega, armazenadas com <strong>criptografia</strong> conforme a <strong>LGPD (Lei nº 13.709/2018)</strong>.
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>💳</span>
                    <div>
                      <div style={{ fontSize: 12, color: "#60a5fa", fontWeight: "bold", marginBottom: 3 }}>Pagamento via Mercado Pago</div>
                      <div style={{ fontSize: 11, color: "#93c5fd", lineHeight: 1.6 }}>
                        Dados de cartão e bancários são processados exclusivamente pelo <strong>Mercado Pago</strong>. Não temos acesso a essas informações.
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    {[["🛡️","SSL 256-bit"],["📋","LGPD"],["🔒","Dados Criptografados"],["✅","Compra Segura"]].map(([ic,lb]) => (
                      <div key={lb} style={{ display:"flex", alignItems:"center", gap:4, fontSize:10, color:"#6ee7b7" }}>
                        <span>{ic}</span><span>{lb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Passo 2 — Confirmação */}
            {checkoutStep === 2 && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <h2 style={{ fontSize: 17, color: "#e8b4b4", letterSpacing: 1 }}>✅ Confirmar Pedido</h2>
                  <button onClick={() => setCheckoutOpen(false)} style={{ background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 18 }}>✕</button>
                </div>
                <p style={{ fontSize: 10, color: "#5a4a4a", letterSpacing: 2, textTransform: "uppercase", marginBottom: 22 }}>Passo 2 de 2 · Revisão</p>
                <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                  {[1,2].map((s) => <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: "#8b2c2c" }} />)}
                </div>

                {/* Itens */}
                <div style={{ background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 10 }}>Itens do Pedido</div>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontSize: 12 }}>
                      <span style={{ color: "#a09080" }}>{item.name} × {item.qty}</span>
                      <span style={{ color: "#e8b4b4" }}>{fmt((item.promoPrice || item.price) * item.qty)}</span>
                    </div>
                  ))}
                  {appliedCoupon && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#4ade80", paddingTop: 8, borderTop: "1px solid #2a1f1f", marginTop: 8 }}>
                      <span>Cupom {appliedCoupon}</span><span>-{fmt(discountAmt)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: "bold", paddingTop: 10, borderTop: "1px solid #2a1f1f", marginTop: 8 }}>
                    <span style={{ color: "#f5f0e8" }}>Total</span><span style={{ color: "#e8b4b4" }}>{fmt(cartFinal)}</span>
                  </div>
                </div>

                {/* Dados cliente */}
                <div style={{ background: "#120e0c", border: "1px solid #2a1f1f", borderRadius: 10, padding: "14px 16px", marginBottom: 20, fontSize: 12 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 10 }}>Dados de Entrega</div>
                  {[["Nome", checkoutData.nome], ["CPF", checkoutData.cpf], ["Contato", checkoutData.contato],
                    ["Endereço", `${checkoutData.rua}, ${checkoutData.numero}${checkoutData.complemento ? " — "+checkoutData.complemento : ""}`],
                    ["Bairro / Cidade", `${checkoutData.bairro ? checkoutData.bairro+" · " : ""}${checkoutData.cidade} ${checkoutData.uf ? "— "+checkoutData.uf : ""}`],
                    ["CEP", checkoutData.cep]
                  ].map(([l, v]) => v && (
                    <div key={l} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                      <span style={{ color: "#5a4a4a", minWidth: 70 }}>{l}:</span>
                      <span style={{ color: "#f5f0e8" }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setCheckoutStep(1)} style={{ flex: 1, padding: "12px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: "#a09080", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>← Editar</button>
                  <button onClick={async () => {
                    const loggedClient = (() => { try { return JSON.parse(localStorage.getItem("v9_client") || "null"); } catch { return null; } })();
                    // ── Asaas Pix ──
                    const gw = (() => { try { return localStorage.getItem("v9_gw") || ""; } catch { return ""; } })();
                    const keys = (() => { try { return JSON.parse(localStorage.getItem("v9_keys") || "{}"); } catch { return {}; } })();
                    const asaasKey = keys["asaas_apiKey"] || "";
                    if (gw === "asaas" && asaasKey && checkoutData.payMethod === "pix") {
                      try {
                        // 1. Criar cliente no Asaas
                        const custResp = await fetch("https://withered-rice-255b.suavidadewil.workers.dev/asaas/customers", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ asaasKey, name: checkoutData.nome, cpfCnpj: checkoutData.cpf.replace(/\D/g,""), mobilePhone: checkoutData.contato.replace(/\D/g,""), email: loggedClient?.email || "" })
                        });
                        const custData = await custResp.json();
                        const customerId = custData.id;
                        if (customerId) {
                          // 2. Criar cobrança Pix
                          const chargeResp = await fetch("https://withered-rice-255b.suavidadewil.workers.dev/asaas/payments", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ asaasKey, customer: customerId, billingType: "PIX", value: cartFinal, dueDate: new Date(Date.now()+86400000).toISOString().slice(0,10), description: `Pedido Vinhos9 — ${cart.map(i=>i.name).join(", ")}` })
                          });
                          const chargeData = await chargeResp.json();
                          if (chargeData.id) {
                            // 3. Pegar QR Code Pix
                            const pixResp = await fetch(`https://withered-rice-255b.suavidadewil.workers.dev/asaas/pix/${chargeData.id}`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ asaasKey })
                            });
                            const pixData = await pixResp.json();
                            if (pixData.payload) {
                              setPixCode(pixData.payload);
                              setPixQR(pixData.encodedImage);
                            }
                          }
                        }
                      } catch(e) { console.error("Asaas error:", e); }
                    }
                    setCheckoutStep(3);
                    const order = {
                      customer: checkoutData.nome,
                      cpf: checkoutData.cpf,
                      contact: checkoutData.contato,
                      email: loggedClient?.email || (checkoutData.contato.includes("@") ? checkoutData.contato : null),
                      address: `${checkoutData.rua}, ${checkoutData.numero}${checkoutData.complemento ? " — "+checkoutData.complemento : ""}, ${checkoutData.bairro}, ${checkoutData.cidade} ${checkoutData.uf} — CEP ${checkoutData.cep}`,
                      items: cart.map(i => `${i.name} × ${i.qty}`).join(", "),
                      total: cartFinal,
                      coupon: appliedCoupon || null,
                      status: "Aguardando",
                      date: new Date().toLocaleDateString("pt-BR"),
                    };
                    await dbInsertOrder(order);
                    setOrders(prev => [{ ...order, id: `#${Date.now()}` }, ...prev]);
                    // Incrementa uso do cupom se aplicado
                    if (appliedCoupon && COUPONS[appliedCoupon]) {
                      const c = COUPONS[appliedCoupon];
                      const updated = { ...customCoupons, [appliedCoupon]: { ...(typeof c === "object" ? c : { pct: c, limit: null }), uses: ((typeof c === "object" ? c.uses : 0) || 0) + 1 } };
                      saveCoupons(updated);
                    }
                    // 10: Sistema de pontos — 100 pts por R$1 gasto
                    try {
                      const savedClient = JSON.parse(localStorage.getItem("v9_client") || "null");
                      if (savedClient) {
                        const pts = Math.floor(cartFinal) * 100;
                        const orderId = `#${Date.now()}`;
                        const updatedClient = {
                          ...savedClient,
                          points: (savedClient.points || 0) + pts,
                          tier: (savedClient.points || 0) + pts >= 20000 ? "Gold" : (savedClient.points || 0) + pts >= 5000 ? "Silver" : "Bronze",
                          orders: [{ id: orderId, date: new Date().toLocaleDateString("pt-BR"), items: cart.map(i => `${i.name} × ${i.qty}`).join(", "), total: cartFinal, status: "Aguardando", pts }, ...(savedClient.orders || [])],
                          pointsHistory: [{ date: new Date().toLocaleDateString("pt-BR"), desc: `Compra ${orderId}`, pts }, ...(savedClient.pointsHistory || [])],
                        };
                        localStorage.setItem("v9_client", JSON.stringify(updatedClient));
                        try { const db = JSON.parse(localStorage.getItem("v9_clients_db") || "{}"); db[updatedClient.id] = updatedClient; localStorage.setItem("v9_clients_db", JSON.stringify(db)); } catch {}
                        showToast(`+${pts} pontos adicionados à sua conta! 🪙`);
                        // E-mail pedido confirmado
                        sendEmail("pedidoConfirmado", {
                          to_email: savedClient.email, to_name: savedClient.name,
                          store_name: "Vinhos9", order_id: orderId,
                          order_items: cart.map(i => `${i.name} × ${i.qty}`).join(", "),
                          order_total: cartFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                          order_date: new Date().toLocaleDateString("pt-BR"),
                          points_earned: pts, points_total: updatedClient.points,
                        });
                      }
                    } catch {}
                    setTimeout(() => { setCart([]); setAppliedCoupon(null); setCouponInput(""); setCheckoutData(emptyCheckout); }, 2200);
                    setTimeout(() => { setCheckoutOpen(false); setCheckoutStep(1); showToast("Pedido confirmado! Entraremos em contato. 🎉"); }, 4000);
                  }} style={{ flex: 2, padding: "12px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 2, textTransform: "uppercase" }}>
                    🍷 Confirmar Pedido
                  </button>
                </div>
              </>
            )}

            {/* Passo 3 — Sucesso */}
            {checkoutStep === 3 && (
              <div style={{ textAlign: "center", padding: "32px 12px" }}>
                <div style={{ fontSize: 52, marginBottom: 16, animation: "fadeIn .5s ease" }}>🍾</div>
                <h2 style={{ fontSize: 22, color: "#4ade80", marginBottom: 10 }}>Pedido Confirmado!</h2>
                <p style={{ fontSize: 13, color: "#a09080", lineHeight: 1.8, marginBottom: 8 }}>
                  Obrigado, <strong style={{ color: "#f5f0e8" }}>{checkoutData.nome.split(" ")[0]}</strong>!<br />
                  Entraremos em contato pelo número <strong style={{ color: "#e8b4b4" }}>{checkoutData.contato}</strong> em breve.
                </p>
                {pixCode && (
                  <div style={{ background: "linear-gradient(145deg,#0a1a0a,#081008)", border: "1px solid #1a4a1a", borderRadius: 10, padding: 20, marginTop: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 11, letterSpacing: 2, color: "#4ade80", textTransform: "uppercase", marginBottom: 12 }}>💚 Pague com Pix</div>
                    {pixQR && <img src={`data:image/png;base64,${pixQR}`} alt="QR Code Pix" style={{ width: 160, height: 160, margin: "0 auto 12px", display: "block", borderRadius: 8 }} />}
                    <div style={{ fontSize: 10, color: "#5a4a4a", marginBottom: 8 }}>Ou copie o código Pix:</div>
                    <div style={{ background: "#0c0a09", border: "1px solid #1a4a1a", borderRadius: 6, padding: "8px 12px", fontSize: 10, color: "#4ade80", fontFamily: "monospace", wordBreak: "break-all", marginBottom: 10 }}>{pixCode}</div>
                    <button onClick={() => { navigator.clipboard?.writeText(pixCode); showToast("Código Pix copiado! ✅"); }}
                      style={{ padding: "8px 20px", background: "#1a4a1a", border: "1px solid #4ade80", borderRadius: 4, color: "#4ade80", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>
                      📋 Copiar código Pix
                    </button>
                  </div>
                )}
                <p style={{ fontSize: 11, color: "#5a4a4a" }}>Esta janela fechará automaticamente…</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ADM LOGIN ── */}
      {page === "admin" && !isLoggedIn && (
        <div style={{ minHeight: "calc(100vh - 62px)", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at center,#1a0a0a 0%,#0c0a09 70%)", animation: "fadeIn .4s ease" }}>
          <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 14, padding: "44px 36px", width: "100%", maxWidth: 380, textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🔐</div>
            <h2 style={{ fontSize: 18, letterSpacing: 2, color: "#e8b4b4", marginBottom: 4 }}>Área Restrita</h2>
            <p style={{ fontSize: 10, color: "#5a4a4a", letterSpacing: 1, marginBottom: 28 }}>PAINEL ADMINISTRATIVO</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5, textAlign: "left" }}>Usuário</label>
              <input value={loginUser} onChange={(e) => setLoginUser(e.target.value)} placeholder="admin" style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "11px 13px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5, textAlign: "left" }}>Senha</label>
              <div style={{ position: "relative" }}>
                <input type={showPass ? "text" : "password"} value={loginPass} onChange={(e) => setLoginPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "11px 38px 11px 13px", color: "#f5f0e8", fontSize: 13, fontFamily: "Georgia,serif" }} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 13 }}>{showPass ? "🙈" : "👁"}</button>
              </div>
            </div>
            {loginError && <p style={{ color: "#ef4444", fontSize: 11, marginBottom: 10, textAlign: "left" }}>⚠ {loginError}</p>}
            <button className="btn-red" onClick={handleLogin} style={{ width: "100%", padding: "13px", borderRadius: 4, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Entrar</button>
          </div>
        </div>
      )}

      {/* ── ADM PAINEL ── */}
      {page === "admin" && isLoggedIn && (
        <div className="adm-layout" style={{ display: "flex", minHeight: "calc(100vh - 62px)", animation: "fadeIn .4s ease" }}>
          <aside className="adm-sidebar" style={{ width: 200, background: "#100c0c", borderRight: "1px solid #2a1f1f", padding: "24px 0", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "0 18px 18px", borderBottom: "1px solid #1a1410" }}>
              <div style={{ fontSize: 8, letterSpacing: 3, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 3 }}>Painel</div>
              <div style={{ fontSize: 12, color: "#e8b4b4" }}>Administração</div>
            </div>
            <div style={{ flex: 1, overflowX: "auto", overflowY: "auto", display: "flex", flexDirection: "column" }} className="adm-tabs-wrap">
            {[["dashboard","📊","Dashboard"],["wines","🍷","Vinhos"],["add","➕","Cadastrar"],["csv","📥","Importar CSV"],["banners","🎨","Banners"],["promos","🏷","Promoções"],["cupons","🎁","Cupons"],["frete","🚚","Frete"],["social","📱","Redes Sociais"],["imagens","🖼","Galeria"],["orders","📦","Pedidos"],["reviews","⭐","Avaliações"],["emails","📧","E-mails"],["pagamento","💳","Pagamento"],["supabase","🗄️","Banco de Dados"],["seguranca","🔐","Segurança"]].map(([tab, icon, label]) => (
              <button key={tab} className="adm-tab" onClick={() => setAdminTab(tab)} style={{ width: "100%", padding: "12px 18px", display: "flex", alignItems: "center", gap: 9, background: adminTab === tab ? "rgba(139,44,44,.3)" : "transparent", border: "none", color: adminTab === tab ? "#e8b4b4" : "#7a6a6a", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", textAlign: "left", borderLeft: adminTab === tab ? "3px solid #8b2c2c" : "3px solid transparent", transition: "all .2s" }}>
                {icon} {label}
                {tab === "promos" && promoWines.length > 0 && <span style={{ background: "#b45309", color: "#fef3c7", fontSize: 9, padding: "1px 6px", borderRadius: 10, marginLeft: "auto" }}>{promoWines.length}</span>}
                {tab === "reviews" && reviews.filter(r => !r.approved).length > 0 && <span style={{ background: "#8b2c2c", color: "#fca5a5", fontSize: 9, padding: "1px 6px", borderRadius: 10, marginLeft: "auto" }}>{reviews.filter(r => !r.approved).length}</span>}
              </button>
            ))}
            </div>
            <div style={{ padding: "14px 18px", borderTop: "1px solid #1a1410", marginTop: "auto" }} className="adm-sair-wrap">
              <button className="btn-ghost" onClick={() => { setIsLoggedIn(false); setLoginUser(""); setLoginPass(""); }} style={{ width: "100%", padding: "9px", borderRadius: 4, fontSize: 10, letterSpacing: 1 }}>🚪 Sair</button>
            </div>
          </aside>

          <main className="adm-content" style={{ flex: 1, padding: 30, overflowY: "auto", fontSize: 15 }}>

            {/* Dashboard */}
            {adminTab === "dashboard" && (
              <div>
                <h1 style={{ fontSize: 21, marginBottom: 5 }}>Dashboard</h1>
                <p style={{ color: "#7a6a6a", fontSize: 12, marginBottom: 24 }}>Visão geral do negócio</p>
                <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 14 }}>
                  {[
                    { label: "Receita Total", value: fmt(totalRevenue), icon: "💰", delta: "+18%", col: "#4ade80" },
                    { label: "Lucro Total", value: fmt(totalProfit), icon: "📈", delta: `Margem ${avgMargin}%`, col: parseFloat(avgMargin) >= 30 ? "#4ade80" : "#fbbf24" },
                    { label: "Em Promoção", value: `${promoWines.length} vinhos`, icon: "🏷", delta: "ativos agora", col: "#fbbf24" },
                    { label: "Estoque", value: wines.reduce((s, w) => s + w.stock, 0) + " un.", icon: "📋", delta: wines.filter(w => w.stock <= 3).length + " baixo estoque", col: wines.filter(w => w.stock <= 3).length > 0 ? "#fb923c" : "#4ade80" },
                  ].map((kpi) => (
                    <div key={kpi.label} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                        <span style={{ fontSize: 8, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase" }}>{kpi.label}</span>
                        <span style={{ fontSize: 17 }}>{kpi.icon}</span>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "bold", color: "#f5f0e8", marginBottom: 2 }}>{kpi.value}</div>
                      <div style={{ fontSize: 10, color: kpi.col }}>{kpi.delta}</div>
                    </div>
                  ))}
                </div>
                {/* KPIs de clientes e pedidos */}
                {(()=>{
                  const cDb = (() => { try { return JSON.parse(localStorage.getItem("v9_clients_db")||"{}"); } catch { return {}; } })();
                  const nClients = Object.keys(cDb).length;
                  const nOrders  = (() => { try { return JSON.parse(localStorage.getItem("v9_orders")||"[]").length; } catch { return 0; } })();
                  const kpis2 = [
                    { label:"Clientes Cadastrados", value: nClients, icon:"👥", delta:"contas ativas", col:"#60a5fa" },
                    { label:"Pedidos Recebidos",    value: Math.max(nOrders, orders.length), icon:"📦", delta:"todos os tempos", col:"#c084fc" },
                    { label:"Vinhos no Catálogo",  value: wines.length, icon:"🍷", delta:`${wines.filter(w=>w.stock>0).length} com estoque`, col:"#e8b4b4" },
                  ];
                  return (
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:26 }}>
                      {kpis2.map(k => (
                        <div key={k.label} style={{ background:"linear-gradient(145deg,#1a1410,#120e0c)", border:"1px solid #2a1f1f", borderRadius:10, padding:16 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:9 }}>
                            <span style={{ fontSize:8, letterSpacing:2, color:"#5a4a4a", textTransform:"uppercase" }}>{k.label}</span>
                            <span style={{ fontSize:17 }}>{k.icon}</span>
                          </div>
                          <div style={{ fontSize:24, fontWeight:"bold", color:k.col, marginBottom:2 }}>{k.value}</div>
                          <div style={{ fontSize:10, color:"#7a6a6a" }}>{k.delta}</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                    <h3 style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase" }}>Receita vs Lucro Mensal</h3>
                    <div style={{ display: "flex", gap: 14, fontSize: 10 }}><span style={{ color: "#8b2c2c" }}>■ Receita</span><span style={{ color: "#4ade80" }}>■ Lucro</span></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
                    {SALES_DATA.map((d) => { const lc = d.revenue - d.cost; return (
                      <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                        <div style={{ fontSize: 8, color: "#7a6a6a" }}>{Math.round(d.revenue / 1000)}k</div>
                        <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 100 }}>
                          <div style={{ flex: 1, background: "linear-gradient(to top,#8b2c2c,#b03a3a)", borderRadius: "3px 3px 0 0", height: `${(d.revenue / maxRevenue) * 100}px` }} />
                          <div style={{ flex: 1, background: "linear-gradient(to top,#166534,#4ade80)", borderRadius: "3px 3px 0 0", height: `${(lc / maxRevenue) * 100}px` }} />
                        </div>
                        <div style={{ fontSize: 9, color: "#a09080" }}>{d.month}</div>
                      </div>
                    ); })}
                  </div>
                </div>
                <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22 }}>
                  <h3 style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>Top Vinhos — Margem</h3>
                  {[...wines].sort((a, b) => b.sales - a.sales).slice(0, 5).map((w, i) => {
                    const mg = margin(w.costPrice, w.price), lc = profit(w.costPrice, w.price);
                    return (
                      <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #1a1410" }}>
                        <span style={{ fontSize: 13, color: ["#ffd700","#c0c0c0","#cd7f32","#a09080","#7a6a6a"][i], width: 20 }}>#{i+1}</span>
                        <div style={{ width: 32, height: 32, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}><WineThumb wine={w} height={32} /></div>
                        <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: "#f5f0e8" }}>{w.name}</div><div style={{ fontSize: 9, color: "#5a4a4a" }}>{w.sales} vendas {w.promoPrice ? "· 🏷 promo" : ""}</div></div>
                        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
                          <MarginBadge pct={mg} />
                          <div style={{ fontSize: 10, color: "#7a6a6a" }}>+{fmt(lc)}/un</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Vinhos mais visitados */}
                <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22 }}>
                  <h3 style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>👁 Vinhos Mais Visitados</h3>
                  {Object.keys(wineVisits).length === 0 ? (
                    <p style={{ fontSize: 12, color: "#3a2a2a" }}>Nenhuma visita registrada ainda. As visitas são contadas quando clientes abrem a página de um produto.</p>
                  ) : (
                    [...wines]
                      .map(w => ({ ...w, visits: wineVisits[w.id] || 0 }))
                      .filter(w => w.visits > 0)
                      .sort((a, b) => b.visits - a.visits)
                      .slice(0, 5)
                      .map((w, i) => (
                        <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #1a1410" }}>
                          <span style={{ fontSize: 13, color: ["#ffd700","#c0c0c0","#cd7f32","#a09080","#7a6a6a"][i], width: 20 }}>#{i+1}</span>
                          <div style={{ width: 32, height: 32, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}><WineThumb wine={w} height={32} /></div>
                          <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: "#f5f0e8" }}>{w.name}</div><div style={{ fontSize: 9, color: "#5a4a4a" }}>{w.category} · {w.origin}</div></div>
                          <div style={{ background: "#1a2a3a", color: "#60a5fa", padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: "bold" }}>{w.visits} visitas</div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {/* Lista vinhos */}
            {adminTab === "wines" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
                  <div><h1 style={{ fontSize: 21, marginBottom: 3 }}>Gerenciar Vinhos</h1><p style={{ color: "#7a6a6a", fontSize: 11 }}>{wines.length} cadastrados</p></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={exportCSV} style={{ padding: "8px 14px", borderRadius: 4, fontSize: 11, letterSpacing: 1, background: "#1a3a1a", border: "1px solid #4ade80", color: "#4ade80", cursor: "pointer", fontFamily: "Georgia,serif" }}>📊 Exportar CSV</button>
                    <button className="btn-red" onClick={() => setAdminTab("add")} style={{ padding: "8px 16px", borderRadius: 4, fontSize: 11, letterSpacing: 1 }}>+ Cadastrar</button>
                  </div>
                </div>
                {exportMsg && <div style={{ marginBottom: 14, padding: "8px 14px", background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.2)", borderRadius: 6, fontSize: 11, color: "#4ade80" }}>✅ {exportMsg}</div>}
                {wines.filter(w => w.stock <= 3 && w.stock > 0).length > 0 && (
                  <div style={{ marginBottom: 16, padding: "10px 16px", background: "rgba(251,146,60,.06)", border: "1px solid rgba(251,146,60,.3)", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>⚠️</span>
                    <span style={{ fontSize: 12, color: "#fb923c" }}><strong>Estoque baixo:</strong> {wines.filter(w => w.stock <= 3 && w.stock > 0).map(w => `${w.name} (${w.stock} un.)`).join(" · ")}</span>
                  </div>
                )}
                {/* 3: Paginação — calcula página atual */}
                {(() => {
                  const totalPages = Math.ceil(wines.length / WINES_PER_PAGE);
                  const page = Math.min(admWinePage, Math.max(1, totalPages));
                  const paged = wines.slice((page - 1) * WINES_PER_PAGE, page * WINES_PER_PAGE);
                  return (
                    <>
                      <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, overflow: "auto" }}>
                        <table className="tbl" style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                          <thead><tr style={{ background: "#120e0c" }}>{["","Vinho","Custo","Venda","Promo","Margem","Estoque","Ações"].map((h) => <th key={h} style={{ padding: "11px 12px", textAlign: "left", fontSize: 8, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", borderBottom: "1px solid #2a1f1f" }}>{h}</th>)}</tr></thead>
                          <tbody>
                            {paged.map((w, i) => { const mg = margin(w.costPrice, w.price); return (
                              <tr key={w.id} style={{ borderBottom: "1px solid #1a1410", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.01)" }}>
                                <td style={{ padding: "9px 12px" }}><div style={{ width: 36, height: 36, borderRadius: 6, overflow: "hidden" }}><WineThumb wine={w} height={36} /></div></td>
                                <td style={{ padding: "9px 12px", color: "#f5f0e8" }}>{w.name}</td>
                                <td style={{ padding: "9px 12px", color: "#a09080" }}>{fmt(w.costPrice||0)}</td>
                                <td style={{ padding: "9px 12px", color: "#e8b4b4" }}>{fmt(w.price)}</td>
                                <td style={{ padding: "9px 12px" }}>{w.promoPrice ? <span style={{ color: "#fbbf24", fontSize: 11 }}>{fmt(w.promoPrice)}</span> : <span style={{ color: "#3a2a2a", fontSize: 10 }}>—</span>}</td>
                                <td style={{ padding: "9px 12px" }}><MarginBadge pct={mg} /></td>
                                <td style={{ padding: "9px 12px" }}><span style={{ background: w.stock < 5 ? "#7f1d1d" : "#1a3a1a", color: w.stock < 5 ? "#fca5a5" : "#4ade80", padding: "2px 8px", borderRadius: 10, fontSize: 10 }}>{w.stock}</span></td>
                                <td style={{ padding: "9px 12px" }}>
                                  <div style={{ display: "flex", gap: 5 }}>
                                    <button onClick={() => setEditWine({ ...w })} style={{ background: "none", border: "1px solid #2a3a2a", color: "#4ade80", padding: "3px 9px", borderRadius: 4, cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif" }}>Editar</button>
                                    <button onClick={() => handleDeleteWine(w.id)} style={{ background: "none", border: "1px solid #3a1f1f", color: "#ef4444", padding: "3px 9px", borderRadius: 4, cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif" }}>Remover</button>
                                    <button onClick={() => { const base = window.location.href.split('?')[0]; window.open(`${base}?produto=${encodeURIComponent(w.id)}`, '_blank'); }} style={{ background: "none", border: "1px solid #2a2a3a", color: "#a0a0e8", padding: "3px 9px", borderRadius: 4, cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif" }}>👁 Ver</button>
                                  </div>
                                </td>
                              </tr>
                            ); })}
                          </tbody>
                        </table>
                      </div>
                      {/* Paginação */}
                      {totalPages > 1 && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, flexWrap: "wrap", gap: 10 }}>
                          <span style={{ fontSize: 12, color: "#7a6a6a" }}>
                            Página {page} de {totalPages} · {wines.length} vinhos
                          </span>
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <button onClick={() => setAdmWinePage(1)} disabled={page === 1}
                              style={{ padding: "5px 10px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: page === 1 ? "#3a2a2a" : "#a09080", cursor: page === 1 ? "default" : "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>«</button>
                            <button onClick={() => setAdmWinePage(p => Math.max(1, p - 1))} disabled={page === 1}
                              style={{ padding: "5px 12px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: page === 1 ? "#3a2a2a" : "#a09080", cursor: page === 1 ? "default" : "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>‹ Anterior</button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                              const n = start + i;
                              if (n > totalPages) return null;
                              return (
                                <button key={n} onClick={() => setAdmWinePage(n)}
                                  style={{ padding: "5px 10px", background: n === page ? "#8b2c2c" : "none", border: `1px solid ${n === page ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 4, color: n === page ? "#fff" : "#a09080", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", minWidth: 34 }}>{n}</button>
                              );
                            })}
                            <button onClick={() => setAdmWinePage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                              style={{ padding: "5px 12px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: page === totalPages ? "#3a2a2a" : "#a09080", cursor: page === totalPages ? "default" : "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>Próxima ›</button>
                            <button onClick={() => setAdmWinePage(totalPages)} disabled={page === totalPages}
                              style={{ padding: "5px 10px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: page === totalPages ? "#3a2a2a" : "#a09080", cursor: page === totalPages ? "default" : "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>»</button>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* 1+2: Cadastrar — formulário largo desktop, ideal mobile */}
            {adminTab === "add" && (
              <div style={{ maxWidth: "100%" }}>
                <h1 style={{ fontSize: 21, marginBottom: 5 }}>Cadastrar Vinho</h1>
                <p style={{ color: "#7a6a6a", fontSize: 11, marginBottom: 24 }}>Adicione um novo vinho ao catálogo</p>
                <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "28px 32px" }}>
                  {renderFormFields(newWine, setNewWine, newImgRef)}
                  <button className="btn-red" onClick={handleAddWine} style={{ marginTop: 18, padding: "13px 32px", borderRadius: 4, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Cadastrar Vinho</button>
                </div>
              </div>
            )}

            {/* 🆕 Banners ADM */}
            {adminTab === "banners" && (
              <BannersAdminPanel banners={banners} saveBanners={saveBanners} />
            )}

            {/* Promoções */}
            {adminTab === "promos" && (
              <div>
                <h1 style={{ fontSize: 21, marginBottom: 5 }}>🏷 Promoções Ativas</h1>
                <p style={{ color: "#7a6a6a", fontSize: 11, marginBottom: 24 }}>{promoWines.length} vinhos em promoção</p>
                {promoWines.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: "#5a4a4a" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>🏷</div>
                    <p style={{ fontSize: 13 }}>Nenhum vinho em promoção no momento.</p>
                    <p style={{ fontSize: 11, marginTop: 6 }}>Para criar uma promoção, edite um vinho e preencha o campo "Preço Promocional".</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
                    {promoWines.map((w) => {
                      const mg = margin(w.costPrice, w.promoPrice);
                      const lc = profit(w.costPrice, w.promoPrice);
                      return (
                        <div key={w.id} style={{ background: "linear-gradient(145deg,#1e1500,#150e00)", border: "1px solid #3a2a00", borderRadius: 12, overflow: "hidden" }}>
                          <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                            <WineThumb wine={w} height="100%" />
                            <div style={{ position: "absolute", top: 10, left: 10, background: "#b45309", color: "#fef3c7", fontSize: 12, padding: "4px 10px", borderRadius: 4, fontWeight: "bold" }}>-{discountPct(w.price, w.promoPrice)}%</div>
                          </div>
                          <div style={{ padding: 16 }}>
                            <div style={{ fontSize: 14, color: "#f5f0e8", fontWeight: "bold", marginBottom: 10 }}>{w.name}</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                              {[["Preço Normal", fmt(w.price), "#a09080"], ["Preço Promo", fmt(w.promoPrice), "#fbbf24"], ["Margem Promo", `${mg}%`, parseFloat(mg) >= 20 ? "#4ade80" : "#f87171"], ["Lucro/Garrafa", fmt(lc), "#4ade80"]].map(([l, v, c]) => (
                                <div key={l} style={{ background: "rgba(0,0,0,.3)", borderRadius: 6, padding: "8px 10px" }}>
                                  <div style={{ fontSize: 8, color: "#5a4a4a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{l}</div>
                                  <div style={{ fontSize: 13, color: c, fontWeight: "bold" }}>{v}</div>
                                </div>
                              ))}
                            </div>
                            <button onClick={() => setEditWine({ ...w })} style={{ width: "100%", padding: "8px", background: "none", border: "1px solid #3a2a00", color: "#fbbf24", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>Editar Promoção</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Pedidos */}
            {adminTab === "orders" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h1 style={{ fontSize: 21, marginBottom: 3 }}>Pedidos</h1>
                    <p style={{ color: "#7a6a6a", fontSize: 11 }}>{Array.isArray(orders) ? orders.length : 0} pedido{orders.length !== 1 ? "s" : ""} registrado{orders.length !== 1 ? "s" : ""}</p>
                  </div>
                  <button onClick={() => {
                    try {
                      const local = JSON.parse(localStorage.getItem("v9_orders") || "[]");
                      if (local.length > 0) { setOrders(local); showToast(`✅ ${local.length} pedidos carregados!`); }
                      else showToast("Nenhum pedido no armazenamento local.", "error");
                    } catch { showToast("Erro ao recarregar.", "error"); }
                  }} style={{ padding: "8px 16px", background: "#1a3a1a", border: "1px solid #4ade80", borderRadius: 4, color: "#4ade80", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                    🔄 Recarregar Pedidos
                  </button>
                </div>
                {orders.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 20px", background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, color: "#5a4a4a" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>📦</div>
                    <p style={{ fontSize: 13, marginBottom: 6 }}>Nenhum pedido ainda.</p>
                    <p style={{ fontSize: 11 }}>Os pedidos finalizados pelos clientes aparecerão aqui automaticamente.</p>
                  </div>
                ) : (
                <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, overflow: "auto" }}>
                  <table className="tbl" style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead><tr style={{ background: "#120e0c" }}>{["#","Cliente","Itens","Total","Data","Status"].map((h) => <th key={h} style={{ padding: "11px 12px", textAlign: "left", fontSize: 8, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", borderBottom: "1px solid #2a1f1f" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {(Array.isArray(orders) ? orders : []).map((o, i) => (
                        <tr key={o.id || i} style={{ borderBottom: "1px solid #1a1410", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.01)" }}>
                          <td style={{ padding: "9px 12px", color: "#e8b4b4", fontSize: 11 }}>{o.id || `#${i+1}`}</td>
                          <td style={{ padding: "9px 12px", color: "#f5f0e8" }}>{o.customer}</td>
                          <td style={{ padding: "9px 12px", color: "#a09080", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.items || o.wine}</td>
                          <td style={{ padding: "9px 12px", color: "#e8b4b4" }}>{fmt(o.total)}</td>
                          <td style={{ padding: "9px 12px", color: "#7a6a6a" }}>{o.date}</td>
                          <td style={{ padding: "9px 12px" }}>
                            <select value={o.status || "Aguardando"} onChange={async (e) => {
                              const novoStatus = e.target.value;
                              const atualizado = { ...o, status: novoStatus };
                              const updated = orders.map(x => (x.id === o.id) ? atualizado : x);
                              setOrders(updated);
                              try { localStorage.setItem("v9_orders", JSON.stringify(updated)); } catch {}
                              if (o.id && !String(o.id).startsWith("#")) {
                                await supaFetch(`/rest/v1/orders?id=eq.${o.id}`, "PATCH", { status: novoStatus });
                              }
                              const clientEmail = o.contact || o.email;
                              if (clientEmail && clientEmail.includes("@")) {
                                if (novoStatus === "Em trânsito") sendEmail("pedidoTransito", { to_email: clientEmail, to_name: o.customer, store_name: "Vinhos9", order_id: o.id, order_date: o.date });
                                else if (novoStatus === "Entregue") sendEmail("pedidoEntregue", { to_email: clientEmail, to_name: o.customer, store_name: "Vinhos9", order_id: o.id, order_total: fmt(o.total), points_earned: Math.floor(o.total) });
                              }
                              showToast(`Status → "${novoStatus}"`);
                            }}
                              style={{ background: o.status === "Entregue" ? "#1a3a1a" : o.status === "Em trânsito" ? "#1a2a3a" : "#2a2a1a", color: o.status === "Entregue" ? "#4ade80" : o.status === "Em trânsito" ? "#60a5fa" : "#fbbf24", border: "none", borderRadius: 10, padding: "3px 10px", fontSize: 10, cursor: "pointer", fontFamily: "Georgia,serif" }}>
                              <option value="Aguardando">Aguardando</option>
                              <option value="Em trânsito">Em trânsito</option>
                              <option value="Entregue">Entregue</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
              </div>
            )}

            {/* ── Avaliações ADM ── */}
            {adminTab === "reviews" && (
              <div>
                <h1 style={{ fontSize: 21, marginBottom: 5 }}>⭐ Avaliações</h1>
                <p style={{ color: "#7a6a6a", fontSize: 11, marginBottom: 24 }}>
                  {reviews.filter(r => !r.approved).length} aguardando aprovação · {reviews.filter(r => r.approved).length} publicadas
                </p>

                {/* ── Adicionar avaliação manual ── */}
                <ManualReviewForm wines={wines} supaCfg={supaCfg} setReviews={setReviews} showToast={showToast} />

                {/* Pendentes */}
                {reviews.filter(r => !r.approved).length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: "#fbbf24", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ background: "#8b2c2c", color: "#fca5a5", fontSize: 9, padding: "2px 8px", borderRadius: 10 }}>{reviews.filter(r => !r.approved).length}</span>
                      Aguardando Aprovação
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {reviews.filter(r => !r.approved).map((r) => {
                        const wine = wines.find(w => w.id === r.wineId);
                        return (
                          <div key={r.id} style={{ background: "linear-gradient(145deg,#1e1205,#160e03)", border: "1px solid #3a2a10", borderRadius: 10, padding: "16px 18px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#8b2c2c,#5a1a1a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#e8b4b4", fontWeight: "bold", flexShrink: 0 }}>
                                    {r.author[0].toUpperCase()}
                                  </div>
                                  <div>
                                    <span style={{ fontSize: 13, color: "#f5f0e8", fontWeight: "bold" }}>{r.author}</span>
                                    <span style={{ fontSize: 10, color: "#5a4a4a", marginLeft: 8 }}>{r.date}</span>
                                  </div>
                                  <div style={{ color: "#f59e0b", fontSize: 13 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                                </div>
                                <div style={{ fontSize: 10, color: "#b45309", marginBottom: 6 }}>Vinho: {wine?.name || "—"}</div>
                                <p style={{ fontSize: 13, color: "#a09080", lineHeight: 1.6, margin: 0 }}>{r.comment}</p>
                              </div>
                              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                                <button onClick={async () => { await dbUpdateReview({ id: r.id, approved: true }); setReviews(prev => prev.map(rv => rv.id === r.id ? { ...rv, approved: true } : rv)); }}
                                  style={{ padding: "7px 14px", background: "#1a3a1a", border: "1px solid #4ade80", color: "#4ade80", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                                  ✓ Aprovar
                                </button>
                                <button onClick={async () => { await dbDeleteReview(r.id); setReviews(prev => prev.filter(rv => rv.id !== r.id)); }}
                                  style={{ padding: "7px 14px", background: "none", border: "1px solid #3a1f1f", color: "#ef4444", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                                  ✕ Recusar
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Publicadas */}
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: "#4ade80", textTransform: "uppercase", marginBottom: 14 }}>
                    Avaliações Publicadas ({reviews.filter(r => r.approved).length})
                  </div>
                  {reviews.filter(r => r.approved).length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px", color: "#5a4a4a", fontSize: 12 }}>Nenhuma avaliação publicada ainda.</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {reviews.filter(r => r.approved).map((r) => {
                        const wine = wines.find(w => w.id === r.wineId);
                        return (
                          <div key={r.id} style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 12, color: "#f5f0e8", fontWeight: "bold" }}>{r.author}</span>
                                <span style={{ color: "#f59e0b", fontSize: 12 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                                <span style={{ fontSize: 10, color: "#5a4a4a" }}>{r.date}</span>
                                <span style={{ fontSize: 9, color: "#8b6060", background: "#1a1410", border: "1px solid #2a1f1f", padding: "1px 7px", borderRadius: 8 }}>{wine?.name || "—"}</span>
                              </div>
                              <p style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.6, margin: 0 }}>{r.comment}</p>
                            </div>
                            <button onClick={() => setReviews(prev => prev.filter(rv => rv.id !== r.id))}
                              style={{ padding: "5px 12px", background: "none", border: "1px solid #3a1f1f", color: "#ef4444", borderRadius: 4, cursor: "pointer", fontSize: 10, fontFamily: "Georgia,serif", flexShrink: 0 }}>
                              Remover
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* 📥 Importar CSV */}
            {adminTab === "csv" && <CSVPanel importCSV={importCSV} showToast={showToast} />}

            {/* 🎁 Cupons */}
            {adminTab === "cupons" && <CuponsPanel customCoupons={customCoupons} saveCoupons={saveCoupons} showToast={showToast} />}

            {/* 🚚 Frete */}
            {adminTab === "frete" && <FretePanel freteConfig={freteConfig} saveFreteConfig={saveFreteConfig} showToast={showToast} />}

            {/* 📱 Redes Sociais */}
            {adminTab === "social" && <SocialPanel showToast={showToast} />}

            {/* 💳 Gateway de Pagamento */}
            {adminTab === "pagamento" && (
              <div style={{ maxWidth: 640 }}>
                <h1 style={{ fontSize: 21, marginBottom: 5 }}>💳 Gateway de Pagamento</h1>
                <p style={{ color: "#7a6a6a", fontSize: 11, marginBottom: 24 }}>Configure o gateway e os descontos por forma de pagamento exibidos na loja.</p>

                {/* ── Descontos por forma de pagamento ── */}
                <div style={{ background:"linear-gradient(145deg,#1a1410,#120e0c)", border:"1px solid #2a1f1f", borderRadius:10, padding:22, marginBottom:22 }}>
                  <div style={{ fontSize:11, letterSpacing:2, color:"#a09080", textTransform:"uppercase", marginBottom:6 }}>🏷 Descontos por Forma de Pagamento</div>
                  <p style={{ fontSize:11, color:"#5a4a4a", marginBottom:16, lineHeight:1.6 }}>
                    Defina o percentual de desconto para cada método. Esses valores aparecem na loja e na página de cada produto.
                  </p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:16 }}>
                    {[
                      { key:"pix",       icon:"⚡", label:"Pix",        color:"#4ade80" },
                      { key:"boleto",    icon:"📄", label:"Boleto",     color:"#fbbf24" },
                      { key:"credito1x", icon:"💳", label:"Cartão 1x",  color:"#e8b4b4" },
                    ].map(({ key, icon, label, color }) => (
                      <div key={key} style={{ background:"#120e0c", border:"1px solid #2a1f1f", borderRadius:8, padding:"14px 12px", textAlign:"center" }}>
                        <div style={{ fontSize:20, marginBottom:6 }}>{icon}</div>
                        <div style={{ fontSize:12, color:"#f5f0e8", marginBottom:10 }}>{label}</div>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                          <input type="number" min="0" max="30" value={payDescontos[key]}
                            onChange={e => setPayDescontos(p => ({ ...p, [key]: Math.max(0, Math.min(30, +e.target.value)) }))}
                            style={{ width:54, background:"#1a1410", border:"1px solid #3a2f2f", borderRadius:4, padding:"7px", color, fontSize:16, fontFamily:"Georgia,serif", textAlign:"center", fontWeight:"bold" }} />
                          <span style={{ color, fontSize:16, fontWeight:"bold" }}>%</span>
                        </div>
                        <div style={{ fontSize:10, marginTop:6, color: payDescontos[key] > 0 ? color : "#5a4a4a" }}>
                          {payDescontos[key] > 0 ? `-${payDescontos[key]}% OFF` : "Sem desconto"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { savePayDescontos(payDescontos); showToast("✅ Descontos salvos! Já visíveis na loja."); }}
                    style={{ padding:"9px 22px", background:"#8b2c2c", border:"none", borderRadius:4, color:"#fff", cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif", letterSpacing:1 }}>
                    💾 Salvar Descontos
                  </button>
                </div>

                {/* Gateway selector */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10, marginBottom: 24 }}>
                  {Object.entries(PAYMENT_GATEWAYS).map(([key, gw]) => (
                    <div key={key} onClick={() => { setPaymentGateway(key); setPaymentSaved(false); }}
                      style={{ background: paymentGateway === key ? "rgba(139,44,44,.2)" : "#1a1410", border: `2px solid ${paymentGateway === key ? "#8b2c2c" : "#2a1f1f"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all .2s", textAlign: "center" }}>
                      <div style={{ fontSize: 22, marginBottom: 6 }}>{gw.icon}</div>
                      <div style={{ fontSize: 12, color: paymentGateway === key ? "#e8b4b4" : "#a09080", fontWeight: "bold" }}>{gw.name}</div>
                      {paymentGateway === key && <div style={{ fontSize: 9, color: "#8b2c2c", marginTop: 4, letterSpacing: 1 }}>● SELECIONADO</div>}
                    </div>
                  ))}
                </div>

                {/* API key fields */}
                <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 24, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <span style={{ fontSize: 22 }}>{PAYMENT_GATEWAYS[paymentGateway].icon}</span>
                    <div>
                      <div style={{ fontSize: 14, color: "#e8b4b4", fontWeight: "bold" }}>{PAYMENT_GATEWAYS[paymentGateway].name}</div>
                      <div style={{ fontSize: 10, color: "#5a4a4a" }}>Insira as credenciais da sua conta</div>
                    </div>
                  </div>

                  {PAYMENT_GATEWAYS[paymentGateway].fields.map(field => (
                    <div key={field} style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: "#5a4a4a", textTransform: "uppercase", marginBottom: 5 }}>{field}</label>
                      <input
                        type="password"
                        value={paymentKeys[`${paymentGateway}_${field}`] || ""}
                        onChange={e => setPaymentKeys(p => ({ ...p, [`${paymentGateway}_${field}`]: e.target.value }))}
                        placeholder={`Cole sua ${field} aqui…`}
                        style={{ width: "100%", background: "#0c0a09", border: "1px solid #2a1f1f", borderRadius: 4, padding: "10px 12px", color: "#f5f0e8", fontSize: 13, fontFamily: "monospace" }}
                      />
                    </div>
                  ))}

                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <button onClick={() => {
                      try { localStorage.setItem("v9_gw", paymentGateway); localStorage.setItem("v9_keys", JSON.stringify(paymentKeys)); } catch {}
                      setPaymentSaved(true); showToast(`✅ ${PAYMENT_GATEWAYS[paymentGateway].name} configurado!`);
                    }}
                      style={{ padding: "11px 24px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif", letterSpacing: 1 }}>
                      💾 Salvar Configuração
                    </button>
                    <button onClick={() => { setPaymentKeys(p => { const n = {...p}; PAYMENT_GATEWAYS[paymentGateway].fields.forEach(f => delete n[`${paymentGateway}_${f}`]); return n; }); setPaymentSaved(false); }}
                      style={{ padding: "11px 18px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: "#5a4a4a", cursor: "pointer", fontSize: 12, fontFamily: "Georgia,serif" }}>
                      🗑 Limpar
                    </button>
                  </div>

                  {paymentSaved && (
                    <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(74,222,128,.07)", border: "1px solid rgba(74,222,128,.2)", borderRadius: 6, fontSize: 12, color: "#4ade80" }}>
                      ✅ {PAYMENT_GATEWAYS[paymentGateway].name} configurado e pronto para integração!
                    </div>
                  )}
                </div>

                {/* Instructions */}
                <div style={{ background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #2a1f1f", borderRadius: 10, padding: 22 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#a09080", textTransform: "uppercase", marginBottom: 14 }}>📖 Onde encontrar suas chaves</div>
                  {paymentGateway === "mercadopago" && <div style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.9 }}>1. Acesse <strong style={{ color: "#e8b4b4" }}>mercadopago.com.br</strong><br />2. Vá em <strong style={{ color: "#e8b4b4" }}>Seu negócio → Configurações → Credenciais</strong><br />3. Copie a <strong style={{ color: "#e8b4b4" }}>Public Key</strong> e o <strong style={{ color: "#e8b4b4" }}>Access Token</strong> de produção</div>}
                  {paymentGateway === "pagseguro" && <div style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.9 }}>1. Acesse <strong style={{ color: "#e8b4b4" }}>pagseguro.uol.com.br</strong><br />2. Vá em <strong style={{ color: "#e8b4b4" }}>Minha Conta → Preferências → Integrações</strong><br />3. Copie o <strong style={{ color: "#e8b4b4" }}>E-mail</strong> e o <strong style={{ color: "#e8b4b4" }}>Token de segurança</strong></div>}
                  {paymentGateway === "stripe" && <div style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.9 }}>1. Acesse <strong style={{ color: "#e8b4b4" }}>dashboard.stripe.com</strong><br />2. Vá em <strong style={{ color: "#e8b4b4" }}>Developers → API Keys</strong><br />3. Copie a <strong style={{ color: "#e8b4b4" }}>Publishable Key</strong> e a <strong style={{ color: "#e8b4b4" }}>Secret Key</strong></div>}
                  {paymentGateway === "pagarme" && <div style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.9 }}>1. Acesse <strong style={{ color: "#e8b4b4" }}>dashboard.pagar.me</strong><br />2. Vá em <strong style={{ color: "#e8b4b4" }}>Configurações → Chaves de API</strong><br />3. Copie a <strong style={{ color: "#e8b4b4" }}>API Key</strong> e a <strong style={{ color: "#e8b4b4" }}>Encryption Key</strong></div>}
                  {paymentGateway === "cielo" && <div style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.9 }}>1. Acesse <strong style={{ color: "#e8b4b4" }}>developercielo.github.io</strong><br />2. Crie uma conta no <strong style={{ color: "#e8b4b4" }}>Portal de Developers Cielo</strong><br />3. Copie o <strong style={{ color: "#e8b4b4" }}>MerchantId</strong> e a <strong style={{ color: "#e8b4b4" }}>MerchantKey</strong></div>}
                  {paymentGateway === "asaas" && <div style={{ fontSize: 12, color: "#7a6a6a", lineHeight: 1.9 }}>1. Acesse <strong style={{ color: "#e8b4b4" }}>asaas.com</strong> e crie sua conta<br />2. Vá em <strong style={{ color: "#e8b4b4" }}>Minha Conta → Configurações → Integrações</strong><br />3. Clique em <strong style={{ color: "#e8b4b4" }}>Chave de API</strong> e copie sua <strong style={{ color: "#e8b4b4" }}>API Key</strong><br />4. Para sandbox use a chave do ambiente de <strong style={{ color: "#e8b4b4" }}>homologação</strong> em <strong style={{ color: "#e8b4b4" }}>sandbox.asaas.com</strong><br /><br /><a href="https://docs.asaas.com" target="_blank" rel="noopener noreferrer" style={{ color: "#e8b4b4" }}>📖 Ver documentação completa →</a></div>}
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(139,44,44,.06)", border: "1px solid rgba(139,44,44,.15)", borderRadius: 6, fontSize: 11, color: "#8b6060" }}>
                    🔒 As chaves ficam salvas apenas no estado local desta sessão. Em produção, armazene-as em variáveis de ambiente seguras no seu servidor.
                  </div>
                </div>
              </div>
            )}

            {/* 🔐 Segurança */}
            {/* 🗄️ Banco de Dados — Supabase */}
            {adminTab === "supabase" && <SupabasePanel supaCfg={supaCfg} supaConnected={supaConnected} supaStatus={supaStatus} testSupaConnection={testSupaConnection} loadFromSupabase={loadFromSupabase} showToast={showToast} />}

            {adminTab === "emails" && <EmailPanel showToast={showToast} />}
            {adminTab === "seguranca" && <SegurancaPanel showToast={showToast} maintenanceCfg={maintenanceCfg} saveMaintenance={saveMaintenance} />}

            {/* 🖼 Galeria de Imagens */}
            {adminTab === "imagens" && <GaleriaPanel supaCfg={supaCfg} wines={wines} setWines={setWines} supaFetch={supaFetch} showToast={showToast} />}

          </main>
        </div>
      )}

      {/* ── MODAL EDITAR ── */}
      {editWine && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={() => setEditWine(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.8)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 14, padding: "26px 26px 22px", width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", animation: "slideUp .3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, color: "#e8b4b4" }}>✏️ Editar Vinho</h2>
              <button onClick={() => setEditWine(null)} style={{ background: "none", border: "none", color: "#a09080", cursor: "pointer", fontSize: 17 }}>✕</button>
            </div>
            {renderFormFields(editWine, setEditWine, editImgRef)}
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button className="btn-red" onClick={handleSaveEdit} style={{ flex: 1, padding: "11px", borderRadius: 4, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Salvar</button>
              <button className="btn-ghost" onClick={() => setEditWine(null)} style={{ padding: "11px 18px", borderRadius: 4, fontSize: 11 }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* 🆕 Painel Conta do Cliente */}
      {clientPanelOpen && (
        <ClientAccountPanel
          wines={wines}
          addToCart={addToCart}
          setSelectedWine={setSelectedWine}
          setPage={setPage}
          initialTab={clientPanelTab}
          onClose={() => setClientPanelOpen(false)}
        />
      )}

      {/* 🎁 Popup Boas-vindas */}
      {showWelcomePopup && <WelcomePopup onClose={() => { setShowWelcomePopup(false); try { localStorage.setItem("v9_popup_shown","1"); } catch {} }} />}

      {/* 💚 WhatsApp Flutuante */}
      <a href="https://wa.me/5542998493579?text=Olá! Vim pelo site Vinhos9 e gostaria de ajuda." target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, width: 56, height: 56, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.5)", transition: "transform .2s", textDecoration: "none" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* DB loading indicator */}
      {dbLoading && (
        <div style={{ position: "fixed", top: 72, left: "50%", transform: "translateX(-50%)", zIndex: 999, background: "#1a1410", border: "1px solid #2a1f1f", borderRadius: 20, padding: "8px 18px", display: "flex", alignItems: "center", gap: 9, boxShadow: "0 8px 24px rgba(0,0,0,.5)" }}>
          <div style={{ width: 14, height: 14, border: "2px solid #2a1f1f", borderTop: "2px solid #8b2c2c", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
          <span style={{ fontSize: 11, color: "#a09080" }}>Sincronizando com Supabase…</span>
        </div>
      )}
      {showWelcomePopup && !welcomeDismissed && (
        <div style={{ position: "fixed", inset: 0, zIndex: 600, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 32, pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto", background: "linear-gradient(145deg,#1a1410,#120e0c)", border: "1px solid #8b2c2c", borderRadius: 14, padding: "22px 26px", maxWidth: 380, width: "90vw", animation: "slideUp .4s ease", boxShadow: "0 20px 60px rgba(0,0,0,.7)", position: "relative" }}>
            <button onClick={() => { setShowWelcomePopup(false); setWelcomeDismissed(true); }} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#5a4a4a", cursor: "pointer", fontSize: 14 }}>✕</button>
            <div style={{ fontSize: 28, marginBottom: 10 }}>🎉</div>
            <div style={{ fontSize: 14, color: "#e8b4b4", fontWeight: "bold", marginBottom: 6 }}>Bem-vindo à Vinhos9!</div>
            <p style={{ fontSize: 12, color: "#a09080", lineHeight: 1.7, marginBottom: 14 }}>
              Ganhe <strong style={{ color: "#fbbf24" }}>5% de desconto</strong> na sua primeira compra usando o cupom:
            </p>
            <div style={{ background: "#120e0c", border: "1px dashed #8b2c2c", borderRadius: 6, padding: "10px 16px", textAlign: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 18, letterSpacing: 4, color: "#fbbf24", fontWeight: "bold" }}>BEMVINDO</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowWelcomePopup(false); setWelcomeDismissed(true); setCartOpen(true); }}
                style={{ flex: 1, padding: "10px", background: "#8b2c2c", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif", letterSpacing: 1 }}>
                🛒 Usar Cupom
              </button>
              <button onClick={() => { setShowWelcomePopup(false); setWelcomeDismissed(true); }}
                style={{ padding: "10px 16px", background: "none", border: "1px solid #2a1f1f", borderRadius: 4, color: "#5a4a4a", cursor: "pointer", fontSize: 11, fontFamily: "Georgia,serif" }}>
                Depois
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔍 Image Zoom Modal */}
      {zoomWine && <ImageZoomModal wine={zoomWine} onClose={() => setZoomWine(null)} />}

      {/* ── Banner PWA fixo — acima do rodapé (home + produto) ── */}
      {page === "store" && !pwaInstalled && (
        <div style={{ background: "linear-gradient(135deg,#1a0808 0%,#2d0f0f 50%,#1a0808 100%)", borderTop: "2px solid #8b2c2c", borderBottom: "2px solid #8b2c2c", padding: "36px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
            {/* Logo grande */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 90, height: 90, borderRadius: 22, overflow: "hidden", border: "2px solid #8b2c2c", boxShadow: "0 0 32px rgba(139,44,44,.5)" }}>
                <img src={PWA_ICON_192} alt="Vinhos9" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: -6, right: -6, background: "#8b2c2c", borderRadius: 10, padding: "2px 7px", fontSize: 10, color: "#fff", fontWeight: "bold", letterSpacing: 1 }}>APP</div>
            </div>

            {/* Texto */}
            <div style={{ flex: 1, minWidth: 220, textAlign: "center" }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#8b6060", textTransform: "uppercase", marginBottom: 6 }}>Disponível como aplicativo</div>
              <div style={{ fontSize: 22, fontWeight: "bold", color: "#f5f0e8", letterSpacing: 1, marginBottom: 8, fontFamily: "Georgia,serif" }}>
                🍷 Vinhos9 no seu celular
              </div>
              <p style={{ fontSize: 14, color: "#b0a090", lineHeight: 1.75, margin: "0 0 18px" }}>
                Instale o app e tenha acesso rápido ao catálogo,<br />
                pedidos e promoções exclusivas — sem instalar nada da loja.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {pwaPrompt ? (
                  <button onClick={handlePwaInstall}
                    style={{ padding: "12px 32px", background: "linear-gradient(135deg,#8b2c2c,#c04040)", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 15, fontFamily: "Georgia,serif", fontWeight: "bold", letterSpacing: 1, boxShadow: "0 4px 20px rgba(139,44,44,.5)" }}>
                    📲 Instalar agora — grátis
                  </button>
                ) : (
                  <div style={{ fontSize: 13, color: "#7a6a6a", padding: "10px 0" }}>
                    No <strong style={{ color: "#e8b4b4" }}>Chrome</strong> ou <strong style={{ color: "#e8b4b4" }}>Safari</strong>: toque em <strong style={{ color: "#e8b4b4" }}>⋮ → Adicionar à tela inicial</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              {[
                ["📴", "Funciona offline"],
                ["⚡", "Acesso instantâneo"],
                ["🔔", "Sem barra do navegador"],
                ["🆓", "100% gratuito"],
              ].map(([ic, txt]) => (
                <div key={txt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#a09080" }}>
                  <span style={{ fontSize: 16 }}>{ic}</span>{txt}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === "store" && (
        <footer style={{ background: "#0c0808", borderTop: "2px solid #2a1f1f", padding: "56px 28px 32px", marginTop: 16 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* Grade principal */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 44, marginBottom: 44 }}>

              {/* Marca */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <img src={LOGO_URI} alt="Vinhos9" style={{ height: 44, width: "auto" }} />
                  <div style={{ fontSize: 24, fontWeight: "bold", letterSpacing: 2, color: "#e8b4b4" }}>VINHOS9</div>
                </div>
                <p style={{ fontSize: 15, color: "#b0a090", lineHeight: 1.9, marginBottom: 14 }}>Vinhos importados selecionados das melhores regiões vinícolas do mundo.</p>
              </div>

              {/* Pagamento */}
              <div>
                <div style={{ fontSize: 14, letterSpacing: 2, color: "#d09080", textTransform: "uppercase", marginBottom: 18, fontWeight: "bold" }}>💳 Formas de Pagamento</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: "⚡", label: "Pix", desc: payDescontos.pix > 0 ? `${payDescontos.pix}% de desconto` : "Aprovação imediata", color: payDescontos.pix > 0 ? "#4ade80" : "#9a8a8a" },
                    { icon: "📄", label: "Boleto", desc: payDescontos.boleto > 0 ? `${payDescontos.boleto}% de desconto` : "Vence em 3 dias úteis", color: payDescontos.boleto > 0 ? "#fbbf24" : "#9a8a8a" },
                    { icon: "💳", label: "Cartão 1x", desc: payDescontos.credito1x > 0 ? `${payDescontos.credito1x}% de desconto` : "Sem acréscimos", color: payDescontos.credito1x > 0 ? "#e8b4b4" : "#9a8a8a" },
                    { icon: "💳", label: "Até 12x", desc: "Sujeito a juros do cartão", color: "#9a8a8a" },
                  ].map(({ icon, label, desc, color }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                      <div>
                        <span style={{ fontSize: 15, color: "#d8c8c0", fontWeight: "bold" }}>{label}</span>
                        <span style={{ fontSize: 13, color, marginLeft: 9 }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, fontSize: 13, color: "#9a8a7a", lineHeight: 1.6 }}>
                  🔒 Processado pelo <strong style={{ color: "#c0a898" }}>Mercado Pago</strong>
                </div>
              </div>

              {/* Segurança */}
              <div>
                <div style={{ fontSize: 14, letterSpacing: 2, color: "#d09080", textTransform: "uppercase", marginBottom: 18, fontWeight: "bold" }}>🔐 Segurança</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    ["🛡️", "SSL 256-bit", "Conexão criptografada"],
                    ["📋", "LGPD", "Dados protegidos por lei"],
                    ["✅", "Compra Segura", "Site verificado"],
                    ["🏅", "Originais", "Garantia de autenticidade"],
                  ].map(([ic, lb, desc]) => (
                    <div key={lb} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{ic}</span>
                      <div>
                        <span style={{ fontSize: 15, color: "#d8c8c0", fontWeight: "bold" }}>{lb}</span>
                        <span style={{ fontSize: 13, color: "#a09090", marginLeft: 9 }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Aviso imagens IA */}
            <div style={{ borderTop: "1px solid #2a1f1f", paddingTop: 22, marginBottom: 20 }}>
              <div style={{ background: "rgba(96,165,250,.07)", border: "1px solid rgba(96,165,250,.2)", borderRadius: 10, padding: "16px 20px", fontSize: 14, color: "#8a9aaa", lineHeight: 1.85 }}>
                📸 <strong style={{ color: "#a8b8c8" }}>Nota sobre as imagens:</strong> As fotos dos vinhos exibidas neste site são reais, porém podem apresentar pequenas diferenças visuais em relação à embalagem física, pois são aprimoradas com <strong style={{ color: "#a8b8c8" }}>inteligência artificial</strong> para melhor apresentação. O produto entregue é 100% original e certificado.
              </div>
            </div>

            {/* Rodapé final */}
            <div style={{ textAlign: "center", paddingTop: 12 }}>
              <img src={LOGO_URI} alt="Vinhos9" style={{ height: 52, width: "auto", margin: "0 auto 8px", display: "block", opacity: .85 }} />
              <div style={{ fontSize: 16, letterSpacing: 3, color: "#a08080", marginBottom: 9, fontWeight: "bold" }}>VINHOS9</div>
              <p style={{ color: "#7a6a6a", fontSize: 13, lineHeight: 1.8 }}>
                © 2026 Vinhos9 Importados · Todos os direitos reservados<br />
                Venda proibida para menores de 18 anos 🔞
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
