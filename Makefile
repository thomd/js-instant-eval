DESTDIR ?= /usr/local
BINDIR = ${DESTDIR}/bin

install:
	install -d ${BINDIR}
	install -m 755 js ${BINDIR}

uninstall:
	rm -f ${BINDIR}/js

test:
	bats test/js.bats

.PHONY: test install uninstall
