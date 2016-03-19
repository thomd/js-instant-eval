DESTDIR ?= /usr/local
BINDIR = ${DESTDIR}/bin

install:
	install -d ${BINDIR}
	install -m 755 js ${BINDIR}
	install -m 755 es ${BINDIR}

uninstall:
	rm -f ${BINDIR}/js
	rm -f ${BINDIR}/es

test:
	bats test/*.bats

.PHONY: test install uninstall
