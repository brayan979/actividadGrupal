def ecuacionDiofantia(a, b):
    q, r = divmod(a, b)
    if r == 0: return (0, b)
    else:
        x, y = ecuacionDiofantia(b, r)
        return (y, x - q * y)


a, b = 1819, 29
x, y = ecuacionDiofantia(a, b)
