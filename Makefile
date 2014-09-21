DESTDIR ?= /usr/local
BINDIR = ${DESTDIR}/bin

test:
	bats test/js.bats

install:
	install -d ${BINDIR}
	install -m 755 js ${BINDIR}

uninstall:
	rm -f ${BINDIR}/js

.PHONY: test install uninstall
